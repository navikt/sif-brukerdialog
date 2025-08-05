/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        exclude: ['./playwright/**/*', 'node_modules', './dist/**/*', '**/*.spec.tsx', '**/*.spec.ts'],
        globals: true,
        environment: 'jsdom',
        css: false,
    },
});
