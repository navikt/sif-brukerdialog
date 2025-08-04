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
            '@utils': path.resolve(__dirname, './src/app/utils'),
            '@types': path.resolve(__dirname, './src/app/types'),
            '@hooks': path.resolve(__dirname, './src/app/hooks'),
        },
    },
});
