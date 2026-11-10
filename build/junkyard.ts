import fs from 'node:fs';
import path from 'node:path';
import {
  type AppManifest,
  type Catalog,
  type CatalogEntry,
  type SearchIndex,
} from '../src/lib/catalog-types.ts';
import { uniqueTokens } from '../src/lib/tokenize.ts';

export interface DiscoveredApp {
  slug: string;
  dir: string;
  /** The app's static index.html. */
  entry: string;
  manifest: AppManifest;
}

const APPS_DIR = 'junkyard';
const MANIFEST = 'app.json';
/** Catalog descriptions stay terse: one short line per card. */
const MAX_DESCRIPTION = 90;

/** Every junkyard/{app}/ folder that has index.html + app.json. Adding an app needs no config: drop in the folder. */
export function discoverApps(root: string, appsDir = APPS_DIR): DiscoveredApp[] {
  const appsRoot = path.join(root, appsDir);
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

export function buildCatalog(apps: DiscoveredApp[]): Catalog {
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

export function buildSearchIndex(apps: DiscoveredApp[]): SearchIndex {
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
