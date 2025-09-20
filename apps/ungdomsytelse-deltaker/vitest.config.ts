/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vitest/config';

import { createAliasConfig } from './vite.shared';

export default defineConfig({
    resolve: {
        alias: createAliasConfig(),
    },
    test: {
        exclude: ['./playwright/**/*', 'node_modules', './dist/**/*', '**/*.spec.tsx', '**/*.spec.ts'],
        globals: true,
        environment: 'jsdom',
        css: false,
    },
});
