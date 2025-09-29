/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import { getDevAppSettings } from './src/devAppSettings';

export default defineConfig({
    plugins: [
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
            transformIndexHtml: (html) => html.replace('{{{APP_SETTINGS}}}', JSON.stringify(getDevAppSettings())),
        },
    ],
    server: {
        port: 8080,
    },
    resolve: {},
    build: {
        sourcemap: true,
    },
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler',
            },
        },
    },
});
