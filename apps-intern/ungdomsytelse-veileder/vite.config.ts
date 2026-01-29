/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';

export default defineConfig({
    plugins: [
        react({
            include: '**/*.{tsx}',
        }),
        // TypeScript checking disabled in Vite to avoid errors from external generated files
        // Use 'yarn check:types' for TypeScript validation
        checker({ typescript: false }),
        {
            name: 'crossorigin',
            transformIndexHtml(html) {
                return html.replace(/<link rel="stylesheet" crossorigin/g, '<link rel="stylesheet" type="text/css"');
            },
        },
    ],
    server: {
        hmr: {
            port: 3005,
        },
        port: 8088,
    },
    define: {
        __IS_VEILEDER_DEMO__: false,
        __VIS_DEMO_BRUKERE__: false,
    },
    resolve: {},
    build: {
        sourcemap: true,
    },
});
