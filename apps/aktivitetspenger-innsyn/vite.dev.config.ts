import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';

import { getDevAppSettings } from './mock/devAppSettings';

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
                return html.replace('{{{APP_SETTINGS}}}', JSON.stringify(getDevAppSettings()));
            },
        },
    ],
    resolve: {
        alias: {
            '@app': resolve(__dirname, './src/app'),
        },
    },
    base: '/aktivitetspenger/innsyn/',
    preview: {
        port: 8080,
    },
    define: {
        __INJECT_DECORATOR_CLIENT_SIDE__: true,
        __USE_FIXED_MOCKED_DATE__: false,
    },

    server: {
        port: 8080,
        proxy: {
            '/mockServiceWorker.js': {
                target: 'http://localhost:8080', // Adjust target URL if needed
                rewrite: () => '/aktivitetspenger/innsyn/mockServiceWorker.js',
            },
        },
    },
    build: {
        sourcemap: true,
    },
});
