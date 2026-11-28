import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';

import { getPlaywrightAppSettings } from './playwright/playwrightAppSettings.ts';

const basePath = '/familie/sykdom-i-familien/soknad/omsorgsdager-aleneomsorg/';

export default defineConfig({
    mode: 'msw',
    plugins: [
        tailwindcss(),
        react({ include: '**/*.{tsx}' }),
        checker({ typescript: true }),
        {
            name: 'crossorigin',
            transformIndexHtml(html) {
                return html.replace(/<link rel="stylesheet" crossorigin/g, '<link rel="stylesheet" type="text/css"');
            },
        },
        {
            name: 'html-transform',
            transformIndexHtml: (html) => {
                return html.replace('{{{APP_SETTINGS}}}', JSON.stringify(getPlaywrightAppSettings()));
            },
        },
    ],
    resolve: {
        alias: {
            '@app': resolve(import.meta.dirname, './src/app'),
        },
    },
    base: basePath,
    define: {
        __IS_DEMO__: false,
        __IS_GITHUB_PAGES__: false,
    },
    server: {
        host: '127.0.0.1',
        port: 4173,
        proxy: {
            '/mockServiceWorker.js': {
                target: 'http://127.0.0.1:4173',
                rewrite: () => `${basePath}mockServiceWorker.js`,
            },
        },
    },
    preview: {
        host: '127.0.0.1',
        port: 4173,
    },
    build: {
        sourcemap: true,
    },
});
