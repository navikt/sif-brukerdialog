/// <reference types="vitest" />
/// <reference types="vite/client" />

import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        exclude: ['./e2e/**/*', './build/**/*', './dist/**/*', '**/*.spec.tsx'],
        globals: true,
        environment: 'jsdom',
        css: false,
    },
    resolve: {
        alias: {
            '@utils': path.resolve(__dirname, './src/app/utils'),
            '@types': path.resolve(__dirname, './src/app/types'),
            '@hooks': path.resolve(__dirname, './src/app/hooks'),
        },
    },
});
