import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build, createServer, type InlineConfig } from 'vite';
import { CATALOG_FILE, SEARCH_INDEX_FILE } from '../src/lib/catalog-types.ts';
import { buildCatalog, buildSearchIndex, discoverApps } from './junkyard.ts';

/**
 * The bundle convention. Every page (the catalog and each junkyard/{app}/) is a
 * static index.html next to a committed bundle/ folder:
 *
 *   {page}/index.html        hand-written, references only ./bundle/main.js and ./bundle/main.css
 *   {page}/main.ts           the one entry; the page's source
 *   {page}/bundle/main.js    built: one file, fixed name, no hashes, no chunks, with a source map
 *   {page}/bundle/main.css   built: all CSS the entry imports
 *
 * All URLs are relative, so a page works from any mount path with no base setting.
 * GitHub Pages serves the repo root from main; nothing is built at deploy time.
 * Run `npm run build` and commit the bundles.
 */
const root = fileURLToPath(new URL('..', import.meta.url));
const watch = process.argv.includes('--watch');

interface Entry {
  name: string;
  /** Folder holding index.html and main.ts, relative to the repo root. */
  dir: string;
}

function entries(): Entry[] {
  return [
    { name: 'catalog', dir: '.' },
    ...discoverApps(root).map(({ slug }) => ({ name: slug, dir: `junkyard/${slug}` })),
  ];
}

function configFor({ dir }: Entry): InlineConfig {
  const source = dir === '.' ? 'src/catalog/main.ts' : `${dir}/main.ts`;
  return {
    root,
    configFile: false,
    publicDir: false,
    logLevel: 'warn',
    // Relative URLs inside the bundle's CSS and assets resolve from the bundle file.
    base: './',
    resolve: {
      alias: { '@lib': `${root}src/lib`, '@styles': `${root}src/styles` },
    },
    build: {
      outDir: path.join(root, dir, 'bundle'),
      emptyOutDir: true,
      // Readable on purpose: debug the file you ship, with a source map.
      minify: false,
      sourcemap: true,
      target: 'es2022',
      lib: { entry: path.join(root, source), formats: ['es'], fileName: () => 'main.js', cssFileName: 'main' },
      rolldownOptions: { output: { codeSplitting: false } },
      ...(watch ? { watch: {} } : {}),
    },
  };
}

/** catalog.json and search-index.json sit at the repo root, beside the catalog page. */
function writeCatalog(): void {
  const apps = discoverApps(root);
  fs.writeFileSync(path.join(root, CATALOG_FILE), JSON.stringify(buildCatalog(apps)));
  fs.writeFileSync(path.join(root, SEARCH_INDEX_FILE), JSON.stringify(buildSearchIndex(apps)));
}

writeCatalog();
const all = entries();
for (const entry of all) console.log(`bundle ${entry.name} -> ${path.join(entry.dir, 'bundle')}/`);
await Promise.all(all.map((entry) => build(configFor(entry))));

if (watch) {
  // The static server serves the repo root, exactly as GitHub Pages does.
  const server = await createServer({ configFile: path.join(root, 'vite.config.ts') });
  await server.listen();
  server.printUrls();
}
