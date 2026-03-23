// @ts-expect-error: vite-plugin has no types
import tailwindcss from '@tailwindcss/vite';
// @ts-expect-error: vite-plugin has no types
import react from '@vitejs/plugin-react';
import { copyFileSync } from 'fs';
import * as path from 'path';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';

import { getDevAppSettings } from './mock/devAppSettings';

export default defineConfig({
    mode: 'playwright',
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
                return html.replace('{{{APP_SETTINGS}}}', JSON.stringify(getDevAppSettings(true)));
            },
        },
        {
            name: 'copy-msw',
            writeBundle() {
                copyFileSync('./mockServiceWorker.js', './dist-playwright/mockServiceWorker.js');
            },
        },
    ],
    resolve: {
        alias: {
            '@app/utils': path.resolve(__dirname, './src/app/utils'),
            '@app/types': path.resolve(__dirname, './src/app/types'),
            '@app/hooks': path.resolve(__dirname, './src/app/hooks'),
            '@app/modules': path.resolve(__dirname, './src/app/modules'),
            '@app/components': path.resolve(__dirname, './src/app/components'),
            '@app/i18n': path.resolve(__dirname, './src/app/i18n'),
        },
    },

    define: {
        INJECT_DECORATOR: false,
    },
    server: {
        port: 8080,
    },
    preview: {
        port: 8080,
    },
    base: '/',
    build: {
        sourcemap: true,
        rollupOptions: {
            input: './index.html',
        },
        outDir: './dist-playwright',
        emptyOutDir: true,
        copyPublicDir: false,
    },
    publicDir: false,
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler',
            },
        },
    },
});
