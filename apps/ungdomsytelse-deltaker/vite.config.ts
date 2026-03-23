/// <reference types="vitest" />
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';

import { createAliasConfig } from './vite.shared';

export default defineConfig({
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
    ],
    resolve: {
        alias: createAliasConfig(),
    },
    define: {
        __IS_GITHUB_PAGES__: false,
        __IS_VEILEDER_DEMO__: false,
        __INJECT_DECORATOR_CLIENT_SIDE__: false,
        __USE_FIXED_MOCKED_DATE__: false,
    },
    server: {
        port: 8080,
    },
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
});
