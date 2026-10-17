import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import { junkyard } from './build/junkyard-plugin.ts';

const root = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  // GitHub Pages serves project sites under /<repo>/; the deploy workflow sets this.
  base: process.env.JUNKYARD_BASE ?? '/',
  // ./public/assets is the single home for static files: served as /assets in dev,
  // copied once into dist/assets on build, and referenced directly by every app.
  publicDir: 'public',
  // Every project owns a fixed port; junk-yard is 5175. strictPort fails loudly instead of drifting to the next free one.
  server: { port: 5175, strictPort: true },
  preview: { port: 5175, strictPort: true },
  resolve: {
    alias: {
      '@lib': `${root}src/lib`,
      '@styles': `${root}src/styles`,
    },
  },
  build: {
    // Hashed bundle output goes to /bundle so it never mixes with /assets.
    assetsDir: 'bundle',
    emptyOutDir: true,
  },
  plugins: [junkyard({ root })],
});
