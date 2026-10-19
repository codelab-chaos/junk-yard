import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import { junkyard } from './build/junkyard-plugin.ts';

const root = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  // Stable URLs: fail on a port conflict instead of starting another server.
  server: { host: '0.0.0.0', port: 5175, strictPort: true, allowedHosts: ['local.atlas01', 'atlas-worker-01'] },
  preview: { host: '0.0.0.0', port: 4173, strictPort: true, allowedHosts: ['local.atlas01', 'atlas-worker-01'] },
  // GitHub Pages serves project sites under /<repo>/; the deploy workflow sets this.
  base: process.env.JUNKYARD_BASE ?? '/',
  // ./public/assets is the single home for static files: served as /assets in dev,
  // copied once into dist/assets on build, and referenced directly by every app.
  publicDir: 'public',
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
