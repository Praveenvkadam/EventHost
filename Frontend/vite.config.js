import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    open: true,
    host: true,
  },
  // Add this to ensure SPA routes work
  build: {
    outDir: 'dist',
  },
  base: '/',
  // This is the key for dev server SPA fallback
  // When using Vite 4+, fallback is automatic in dev, but in case of direct browser refresh:
  // we can configure a fallback for preview or production
  preview: {
    port: 3000,
    strictPort: true,
  },
});
