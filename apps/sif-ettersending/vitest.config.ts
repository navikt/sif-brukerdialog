/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vitest/config';

/** Basic oppsett */

export default defineConfig({
    test: {
        exclude: ['./e2e/**/*'],
        globals: true,
        environment: 'jsdom',
        css: false,
    },
});
