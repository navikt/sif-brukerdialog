/// <reference types="vitest" />
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';
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
            '@i18n': path.resolve(__dirname, './src/app/i18n'),
            '@sb': path.resolve(__dirname, './src/storybook'),
        },
    },

    define: {
        INJECT_DECORATOR: true,
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
