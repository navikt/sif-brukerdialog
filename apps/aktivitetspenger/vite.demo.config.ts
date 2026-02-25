/// <reference types="vitest" />
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';

import { getDevAppSettings } from './mock/devAppSettings';
import { createAliasConfig } from './vite.shared';

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
        alias: createAliasConfig(),
    },
    define: {
        __IS_GITHUB_PAGES__: true,
        __IS_VEILEDER_DEMO__: true,
        __INJECT_DECORATOR_CLIENT_SIDE__: false,
        __USE_FIXED_MOCKED_DATE__: false,
    },
    server: {
        port: 8080,
        proxy: {
            '/mockServiceWorker.js': {
                target: 'http://localhost:8080',
                rewrite: () => '/sif-brukerdialog/aktivitetspenger/soknad/mockServiceWorker.js',
            },
        },
    },
    preview: {
        port: 8080,
        proxy: {
            '/mockServiceWorker.js': {
                target: 'http://localhost:8080',
                rewrite: () => '/sif-brukerdialog/aktivitetspenger/soknad/mockServiceWorker.js',
            },
        },
    },
    base: '/sif-brukerdialog/aktivitetspenger/soknad/',
    build: {
        sourcemap: true,
        rollupOptions: {
            input: './demo/index.html',
        },
        outDir: './dist-demo',
        emptyOutDir: true,
    },
});
