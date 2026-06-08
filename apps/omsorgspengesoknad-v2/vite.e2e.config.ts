import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';

import { getPlaywrightAppSettings } from './playwright/playwrightAppSettings';

export default defineConfig({
    mode: 'msw',
    plugins: [
        tailwindcss(),
        react({
            include: '**/*.{tsx}',
        }),
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
            '@app': resolve(__dirname, './src/app'),
        },
    },
    base: '/familie/sykdom-i-familien/soknad/omsorgspenger/',
    define: {
        __SCENARIO_HEADER__: true,
    },
    server: {
        host: '127.0.0.1',
        port: 4173,
        proxy: {
            '/mockServiceWorker.js': {
                target: 'http://127.0.0.1:4173',
                rewrite: () => '/familie/sykdom-i-familien/soknad/omsorgspenger/mockServiceWorker.js',
            },
        },
    },
    build: {
        sourcemap: true,
    },
});
