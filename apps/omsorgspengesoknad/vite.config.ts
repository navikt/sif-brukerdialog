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
        chunkSizeWarningLimit: 2000,
        sourcemap: true,
        target: 'esnext',
        codeSplitting: {
            groups: [
                { name: 'vendor', test: /\/node_modules\/(react|react-dom|react-intl)\//, priority: 5 },
                { name: 'router', test: /\/node_modules\/react-router-dom\//, priority: 4 },
                { name: 'forms', test: /\/node_modules\/formik\//, priority: 3 },
                { name: 'utils', test: /\/node_modules\/(lodash|date-fns|dayjs|axios|uuid|zod)\//, priority: 2 },
                { name: 'navikt', test: /\/node_modules\/@navikt\/(ds-react|aksel-icons)\//, priority: 1 },
            ],
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
