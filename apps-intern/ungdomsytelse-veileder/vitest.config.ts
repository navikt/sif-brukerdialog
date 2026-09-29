/// <reference types="vitest" />
/// <reference types="vite/client" />

import * as path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    define: {
        __IS_GITHUB_PAGES__: false,
        __IS_DEMO__: false,
    },
    test: {
        exclude: ['./playwright/**/*', './mock/**/*', './build/**/*', './dist/**/*', '**/*.spec.tsx', 'node_modules'],
        globals: true,
        environment: 'jsdom',
        css: false,
        alias: {
            '@i18n': path.resolve(import.meta.dirname, './src/app/i18n'),
        },
    },
});
