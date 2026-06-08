/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        exclude: ['./playwright/**/*', './build/**/*', './dist/**/*', 'node_modules'],
        passWithNoTests: true,
        globals: true,
        environment: 'jsdom',
        css: false,
    },
});