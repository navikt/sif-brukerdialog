/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vitest/config';

export default defineConfig({
    define: {
        __IS_GITHUB_PAGES__: false,
        __IS_DEMO__: false,
    },
    test: {
        exclude: ['./playwright/**/*', './build/**/*', './dist/**/*', 'node_modules'],
        globals: true,
        environment: 'jsdom',
        css: false,
    },
});
