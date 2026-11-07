import { copyFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const OUT_DIR = 'build';

/**
 * GitHub Pages serves 404.html for unknown paths. Making it a copy of the app
 * lets deep links like /work/dance-ai load and route on the client.
 */
const spaFallback = () => ({
  name: 'spa-404-fallback',
  apply: 'build',
  async closeBundle() {
    await copyFile(resolve(OUT_DIR, 'index.html'), resolve(OUT_DIR, '404.html'));
  },
});

export default defineConfig({
  plugins: [react(), spaFallback()],
  build: {
    // CI deploys ./build to GitHub Pages
    outDir: OUT_DIR,
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    globals: true,
  },
});
