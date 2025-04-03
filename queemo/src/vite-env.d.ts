import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
/// <reference types="vite/client" />

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/lol-api': {
        target: 'https://127.0.0.1:65041',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/lol-api/, ''),
      },
    },
  },
});