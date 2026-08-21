// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

export default defineConfig({
  site: 'https://epignos.dev',
  adapter: node({
    mode: 'standalone',
  }),
});