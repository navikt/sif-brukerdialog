import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { copyFileSync } from 'fs';
import * as path from 'path';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';

import { getDemoAppSettings } from './mock/demoAppSettings.ts';
import { getBuildBranch } from './mock/getBuildBranch.ts';

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
                return html.replace(
                    '{{{APP_SETTINGS}}}',
                    JSON.stringify({ ...getDemoAppSettings(), GITHUB_REF_NAME: getBuildBranch() }),
                );
            },
        },
        {
            name: 'copy-msw',
            writeBundle() {
                copyFileSync('./mockServiceWorker.js', './dist-demo/mockServiceWorker.js');
            },
        },
    ],
    resolve: {
        alias: {
            '@app': path.resolve(import.meta.dirname, './src/app'),
            '@app/utils': path.resolve(import.meta.dirname, './src/app/utils'),
            '@app/types': path.resolve(import.meta.dirname, './src/app/types'),
            '@app/hooks': path.resolve(import.meta.dirname, './src/app/hooks'),
            '@app/modules': path.resolve(import.meta.dirname, './src/app/modules'),
            '@app/components': path.resolve(import.meta.dirname, './src/app/components'),
            '@app/i18n': path.resolve(import.meta.dirname, './src/app/i18n'),
        },
    },
    define: {
        'import.meta.env.INJECT_DECORATOR': false,
        __IS_GITHUB_PAGES__: true,
    },
    server: {
        port: 8080,
    },
    preview: {
        port: 8080,
    },
    base: '/sif-brukerdialog/endringsmelding-pleiepenger/',
    build: {
        sourcemap: true,
        rollupOptions: {
            input: './index.html',
        },
        outDir: './dist-demo',
        emptyOutDir: true,
    },
});
