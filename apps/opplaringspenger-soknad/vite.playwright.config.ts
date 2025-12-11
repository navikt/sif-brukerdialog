import react from '@vitejs/plugin-react';
import { copyFileSync } from 'fs';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import { getDevAppSettings } from './mock/devAppSettings';
import tailwindcss from '@tailwindcss/vite';

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
                return html.replace('{{{APP_SETTINGS}}}', JSON.stringify(getDevAppSettings()));
            },
        },
        {
            name: 'copy-msw',
            writeBundle() {
                copyFileSync('./mockServiceWorker.js', './dist-playwright/mockServiceWorker.js');
            },
        },
    ],
    define: {
        'import.meta.env.INJECT_DECORATOR': false,
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
