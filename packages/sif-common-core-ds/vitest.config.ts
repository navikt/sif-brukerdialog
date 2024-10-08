/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        exclude: ['./e2e/**/*', './build/**/*', './dist/**/*', '**/*.spec.tsx', 'node_modules'],
        globals: true,
        environment: 'jsdom',
        css: false,
    },
});
