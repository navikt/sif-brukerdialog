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
        {
            name: 'crossorigin',
            transformIndexHtml(html) {
                return html.replace(/<link rel="stylesheet" crossorigin/g, '<link rel="stylesheet" type="text/css"');
            },
        },
    ],
    resolve: {},
    build: {
        sourcemap: true,
        target: 'esnext',
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['react', 'react-dom', 'react-intl'],
                    router: ['react-router-dom'],
                    forms: ['formik'],
                    utils: ['lodash', 'date-fns', 'dayjs', 'axios', 'uuid', 'zod'],
                    navikt: ['@navikt/ds-react', '@navikt/ds-icons'],
                },
            },
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler', // or "modern", "legacy"
            },
        },
    },
});
