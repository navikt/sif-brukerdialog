/// <reference types="vitest" />
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { copyFileSync } from 'fs';
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
        {
            name: 'copy-msw',
            writeBundle() {
                copyFileSync('./mockServiceWorker.js', './dist-demo/mockServiceWorker.js');
            },
        },
    ],
    define: {
        __IS_GITHUB_PAGES__: true,
        'import.meta.env.INJECT_DECORATOR': false,
    },
    server: {
        port: 8080,
        proxy: {
            '/mockServiceWorker.js': {
                target: 'http://localhost:8080',
                rewrite: () => '/sif-brukerdialog/opplaringspenger-soknad/mockServiceWorker.js',
            },
        },
    },
    preview: {
        port: 8080,
        proxy: {
            '/mockServiceWorker.js': {
                target: 'http://localhost:8080',
                rewrite: () => '/sif-brukerdialog/opplaringspenger-soknad/mockServiceWorker.js',
            },
        },
    },
    base: '/sif-brukerdialog/opplaringspenger-soknad/',
    build: {
        sourcemap: true,
        rollupOptions: {
            input: './demo/index.html',
        },
        outDir: './dist-demo',
        emptyOutDir: true,
    },
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler',
            },
        },
    },
});
