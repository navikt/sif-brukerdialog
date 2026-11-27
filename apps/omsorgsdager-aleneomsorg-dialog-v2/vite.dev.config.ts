import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';

import { getDevAppSettings } from './mock/devAppSettings.ts';

export default defineConfig({
    mode: 'msw',
    plugins: [
        tailwindcss(),
        react({
            include: '**/*.{tsx}',
        }),
        checker({
            typescript: true,
        }),
        {
            name: 'crossorigin',
            transformIndexHtml(html) {
                return html.replace(/<link rel="stylesheet" crossorigin/g, '<link rel="stylesheet" type="text/css"');
            },
        },
        {
            name: 'html-transform',
            transformIndexHtml: (html) => html.replace('{{{APP_SETTINGS}}}', JSON.stringify(getDevAppSettings())),
        },
    ],
    resolve: {
        alias: {
            '@app': resolve(import.meta.dirname, './src/app'),
        },
    },
    base: '/familie/sykdom-i-familien/soknad/omsorgsdager-aleneomsorg/',
    server: {
        port: 8080,
        proxy: {
            '/mockServiceWorker.js': {
                target: 'http://localhost:8080',
                rewrite: () => '/familie/sykdom-i-familien/soknad/omsorgsdager-aleneomsorg/mockServiceWorker.js',
            },
        },
    },
    preview: {
        port: 8080,
    },
    define: {
        __IS_GITHUB_PAGES__: false,
        __IS_DEMO__: true,
    },
});
