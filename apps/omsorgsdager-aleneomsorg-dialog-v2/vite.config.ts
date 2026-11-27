import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';

export default defineConfig(({ mode }) => ({
    plugins: [
        tailwindcss(),
        react({
            include: '**/*.{tsx}',
        }),
        checker({
            typescript: true,
        }),
    ],
    resolve: {
        alias: {
            '@app': resolve(import.meta.dirname, './src/app'),
        },
    },
    base:
        mode === 'production'
            ? 'https://cdn.nav.no/dusseldorf/omsorgsdager-aleneomsorg-dialog-v2/dist/'
            : '/familie/sykdom-i-familien/soknad/omsorgsdager-aleneomsorg/',
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
    build: {
        sourcemap: true,
        minify: mode === 'production',
    },
    define: {
        __IS_GITHUB_PAGES__: false,
        __IS_DEMO__: false,
    },
}));
