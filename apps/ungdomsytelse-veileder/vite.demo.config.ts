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
    preview: {
        port: 8088,
        proxy: {
            '/mockServiceWorker.js': {
                target: 'http://localhost:8088', // Adjust target URL if needed
                rewrite: () => '/sif-brukerdialog/ungdomsytelse-veileder/mockServiceWorker.js',
            },
        },
    },
    base: '/sif-brukerdialog/ungdomsytelse-veileder/',
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
