/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        exclude: ['node_modules'],
        globals: true,
        environment: 'jsdom',
        css: false,
    },
});
