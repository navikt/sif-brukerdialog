import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';

export default defineConfig({
    plugins: [
        tailwindcss(),
        react({
            include: '**/*.{tsx}',
        }),
        checker({ typescript: true }),
    ],
    resolve: {
        alias: {
            '@app': resolve(__dirname, './src/app'),
            '@common': resolve(__dirname, './src/common'),
            '@rammeverk': resolve(__dirname, './src/rammeverk'),
        },
    },
    base: '/sif-demo/',
    preview: {
        port: 8080,
    },
    server: {
        port: 8080,
        proxy: {
            '/mockServiceWorker.js': {
                target: 'http://localhost:8080', // Adjust target URL if needed
                rewrite: () => '/sif-demo/mockServiceWorker.js',
            },
        },
    },
    build: {
        sourcemap: true,
    },
});
