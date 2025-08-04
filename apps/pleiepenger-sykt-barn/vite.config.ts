/* eslint-disable @typescript-eslint/no-unused-vars */
/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import * as path from 'path';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';

export default defineConfig({
    plugins: [
        react({
            include: '**/*.{tsx}',
        }),
        checker({
            typescript: true,
        }),
        {
            name: 'crossorigin',
            transformIndexHtml(html) {
                return html.replace(/<link rel="stylesheet" crossorigin/g, '<link rel="stylesheet" type="text/css"');
            },
        },
    ],
    resolve: {
        alias: {
            '@i18n': path.resolve(__dirname, './src/app/i18n'),
            '@sb': path.resolve(__dirname, './src/storybook'),
        },
    },
    build: {
        sourcemap: true,
        target: 'esnext',
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['react', 'react-dom'],
                    router: ['react-router-dom'],
                    forms: ['formik'],
                    utils: ['lodash', 'date-fns', 'dayjs'],
                    navikt: ['@navikt/ds-react', '@navikt/ds-icons'],
                },
            },
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler',
            },
        },
    },
});
