import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

export default defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: {
      '@codemirror/lang-css': path.resolve(__dirname, 'node_modules/@codemirror/lang-css'),
      '@uiw/codemirror-theme-darcula': path.resolve(__dirname, 'node_modules/@uiw/codemirror-theme-darcula')
    }
  }
});
