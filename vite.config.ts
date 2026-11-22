import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'html-transform',
      transformIndexHtml: {
        order: 'pre',
        handler(html) {
          return html.replace(
            /<script type="module" crossorigin src="[^"]*assets\/index\.js"><\/script>/,
            '<script type="module" src="/src/main.tsx"></script>'
          ).replace(
            /<link rel="stylesheet" crossorigin href="[^"]*assets\/index\.css">/,
            ''
          );
        },
      },
    },
  ],
  base: './',
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'assets/index.js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
      },
    },
  },
})
