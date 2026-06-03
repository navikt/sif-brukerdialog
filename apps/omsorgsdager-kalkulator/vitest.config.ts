/// <reference types="vitest" />

import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        exclude: ['./playwright/**/*', './e2e/**/*', './node_modules/**/*'],
        globals: true,
        environment: 'jsdom',
        css: false,
    },
});
