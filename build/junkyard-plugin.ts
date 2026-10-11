import fs from 'node:fs';
import path from 'node:path';
import type { Plugin } from 'vite';
import {
  CATALOG_FILE,
  SEARCH_INDEX_FILE,
  type AppManifest,
  type Catalog,
  type CatalogEntry,
  type SearchIndex,
} from '../src/lib/catalog-types.ts';
import { uniqueTokens } from '../src/lib/tokenize.ts';

interface Options {
  root: string;
  appsDir?: string;
}

interface DiscoveredApp {
  slug: string;
  dir: string;
  entry: string;
  manifest: AppManifest;
}

const APPS_DIR = 'junkyard';
const MANIFEST = 'app.json';
/** Catalog descriptions stay terse: one short line per card. */
const MAX_DESCRIPTION = 90;

/**
 * Turns every junkyard/{app}/ folder that has index.html + app.json into a
 * build entry, and generates catalog.json and search-index.json from them.
 * Adding an app needs no config changes: drop in the folder.
 */
export function junkyard({ root, appsDir = APPS_DIR }: Options): Plugin {
  const appsRoot = path.join(root, appsDir);
  const discover = () => discoverApps(appsRoot, appsDir);

  return {
    name: 'junkyard',

    config() {
      const inputs = Object.fromEntries(discover().map((app) => [app.slug, app.entry]));
      return { build: { rolldownOptions: { input: { main: path.join(root, 'index.html'), ...inputs } } } };
    },

    configureServer(server) {
      server.watcher.add(path.join(appsRoot, `*/${MANIFEST}`));
      server.watcher.on('change', (file) => {
        if (file.endsWith(MANIFEST)) server.ws.send({ type: 'full-reload' });
      });
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split('?')[0] ?? '';
        const body = url.endsWith(`/${CATALOG_FILE}`)
          ? buildCatalog(discover())
          : url.endsWith(`/${SEARCH_INDEX_FILE}`)
            ? buildSearchIndex(discover())
            : undefined;
        if (body === undefined) return next();
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(body));
      });
    },

    generateBundle() {
      const apps = discover();
      this.emitFile({ type: 'asset', fileName: CATALOG_FILE, source: JSON.stringify(buildCatalog(apps)) });
      this.emitFile({ type: 'asset', fileName: SEARCH_INDEX_FILE, source: JSON.stringify(buildSearchIndex(apps)) });
    },
  };
}

function discoverApps(appsRoot: string, appsDir: string): DiscoveredApp[] {
  if (!fs.existsSync(appsRoot)) return [];
  return fs
    .readdirSync(appsRoot, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => path.join(appsRoot, d.name))
    .filter((dir) => fs.existsSync(path.join(dir, 'index.html')) && fs.existsSync(path.join(dir, MANIFEST)))
    .map((dir) => {
      const slug = path.basename(dir);
      return {
        slug,
        dir,
        entry: path.join(dir, 'index.html'),
        manifest: readManifest(path.join(dir, MANIFEST), `${appsDir}/${slug}`),
      };
    });
}

function readManifest(file: string, label: string): AppManifest {
  const data = JSON.parse(fs.readFileSync(file, 'utf8')) as Partial<AppManifest>;
  const missing = (['title', 'description', 'created'] as const).filter((k) => typeof data[k] !== 'string');
  if (missing.length > 0 || !Array.isArray(data.tags)) {
    throw new Error(`[junkyard] ${label}/${MANIFEST} needs title, description, created and tags[]`);
  }
  if (data.description!.length > MAX_DESCRIPTION) {
    throw new Error(`[junkyard] ${label}/${MANIFEST} description is over ${MAX_DESCRIPTION} chars; move detail to keywords`);
  }
  return data as AppManifest;
}

function buildCatalog(apps: DiscoveredApp[]): Catalog {
  const entries: CatalogEntry[] = apps.map(({ slug, manifest }) => ({
    slug,
    path: `${APPS_DIR}/${slug}/`,
    title: manifest.title,
    description: manifest.description,
    tags: manifest.tags,
    created: manifest.created,
    updated: manifest.updated,
  }));
  entries.sort((a, b) => (b.updated ?? b.created).localeCompare(a.updated ?? a.created));
  return { generated: new Date().toISOString(), apps: entries };
}

function buildSearchIndex(apps: DiscoveredApp[]): SearchIndex {
  const terms = Object.fromEntries(
    apps.map(({ slug, dir, entry, manifest }) => {
      const extraFiles = (manifest.index ?? []).map((f) => fs.readFileSync(path.join(dir, f), 'utf8'));
      return [
        slug,
        uniqueTokens(
          manifest.title,
          manifest.description,
          manifest.tags.join(' '),
          (manifest.keywords ?? []).join(' '),
          htmlText(fs.readFileSync(entry, 'utf8')),
          ...extraFiles,
        ),
      ];
    }),
  );
  return { version: 1, terms };
}

/** Visible text of an HTML file, without scripts, styles or tags. */
function htmlText(html: string): string {
  return html
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/gi, ' ');
}
