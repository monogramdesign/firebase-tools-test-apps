// @ts-check
import { defineConfig } from 'astro/config';
import node from '@apphosting/astro-adapter';

export default defineConfig({
  output: 'server',
  adapter: node({ mode: 'standalone' }),
});
