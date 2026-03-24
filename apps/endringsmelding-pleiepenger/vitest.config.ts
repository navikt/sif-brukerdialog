/// <reference types="vitest" />
/// <reference types="vite/client" />

import * as path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        exclude: ['./playwright/**/*', './build/**/*', './dist/**/*', '**/*.spec.tsx', 'node_modules'],
        globals: true,
        environment: 'jsdom',
        css: false,
    },
    resolve: {
        alias: {
            '@app/utils': path.resolve(__dirname, './src/app/utils'),
            '@app/types': path.resolve(__dirname, './src/app/types'),
            '@app/hooks': path.resolve(__dirname, './src/app/hooks'),
            '@app/modules': path.resolve(__dirname, './src/app/modules'),
            '@app/components': path.resolve(__dirname, './src/app/components'),
            '@app/i18n': path.resolve(__dirname, './src/app/i18n'),
        },
    },
});
