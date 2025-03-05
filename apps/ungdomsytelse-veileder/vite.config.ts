/* eslint-disable @typescript-eslint/no-unused-vars */
/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';

export default defineConfig({
    plugins: [
        react({
            include: '**/*.{tsx}',
        }),
        checker({ typescript: true }),
    ],
    server: {
        hmr: {
            port: 3005,
        },
        port: 8088,
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
