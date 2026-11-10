import { defineConfig } from 'vite';

// Vite is only the static file server here (`npm run dev`, `npm run preview`); bundles are
// built by build/bundle.ts. outDir '.' makes `vite preview` serve the repo root, as Pages does.
export default defineConfig({
  // Stable URLs: fail on a port conflict instead of starting another server.
  server: { host: '0.0.0.0', port: 5175, strictPort: true, allowedHosts: ['local.atlas01', 'atlas-worker-01'] },
  preview: { host: '0.0.0.0', port: 4173, strictPort: true, allowedHosts: ['local.atlas01', 'atlas-worker-01'] },
  build: { outDir: '.' },
});
