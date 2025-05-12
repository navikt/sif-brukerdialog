/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        tailwindcss(),
        react({
            include: '**/*.{tsx}',
        }),
        checker({ typescript: true }),
    ],
    define: {
        __IS_GITHUB_PAGES__: true,
    },
    server: {
        port: 8080,
        proxy: {
            '/mockServiceWorker.js': {
                target: 'http://localhost:8080', // Adjust target URL if needed
                rewrite: () => '/sif-brukerdialog/ungdomsytelse-deltaker/mockServiceWorker.js',
            },
        },
    },
    preview: {
        port: 8080,
        proxy: {
            '/mockServiceWorker.js': {
                target: 'http://localhost:8080', // Adjust target URL if needed
                rewrite: () => '/sif-brukerdialog/ungdomsytelse-deltaker/mockServiceWorker.js',
            },
        },
    },
    base: '/sif-brukerdialog/ungdomsytelse-deltaker/',
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
