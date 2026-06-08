/// <reference types="vitest" />
/// <reference types="vite/client" />

import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    resolve: {
        alias: {
            '@app': resolve(__dirname, './src/app'),
        },
    },
    test: {
        exclude: ['./playwright/**/*', './build/**/*', './dist/**/*', 'node_modules'],
        globals: true,
        environment: 'jsdom',
        css: false,
    },
});
