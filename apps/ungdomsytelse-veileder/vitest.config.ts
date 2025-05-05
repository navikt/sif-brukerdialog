/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vitest/config';
import * as path from 'path';

export default defineConfig({
    test: {
        exclude: ['./e2e/**/*', './build/**/*', './dist/**/*', '**/*.spec.tsx', 'node_modules'],
        globals: true,
        environment: 'jsdom',
        css: false,
        alias: {
            '@i18n': path.resolve(__dirname, './src/app/i18n'),
        },
    },
});
