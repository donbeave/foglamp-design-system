import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import { fumadocsMdx } from 'fumadocs-mdx/vite';
import story from '@fumadocs/story/vite';

export default defineConfig({
  plugins: [fumadocsMdx(), story(), tailwindcss(), tanstackStart(), react()],
  resolve: { tsconfigPaths: true },
});
