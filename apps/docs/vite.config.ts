import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import { fumadocsMdx } from 'fumadocs-mdx/vite';
import story from '@fumadocs/story/vite';

export default defineConfig({
  plugins: [fumadocsMdx(), story(), tailwindcss(), tanstackStart(), react()],
  resolve: { tsconfigPaths: true, dedupe: ['react', 'react-dom'] },
  optimizeDeps: {
    include: [
      'fumadocs-ui/layouts/docs',
      'fumadocs-ui/layouts/docs/page',
      'fumadocs-ui/mdx',
      'fumadocs-ui/provider/base',
      'fumadocs-ui/provider/tanstack',
      'fumadocs-ui > lucide-react',
      '@tailrocks/framerock > recharts',
      '@tailrocks/framerock > recharts > use-sync-external-store/shim/with-selector',
    ],
  },
});
