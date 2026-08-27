/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import * as path from 'path';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';

export default defineConfig(({ mode }) => ({
    plugins: [
        react({
            include: '**/*.{jsx,tsx}',
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
        alias: {
            '@app': path.resolve(__dirname, './src/app'),
        },
    },
    base: mode === 'production' ? 'https://cdn.nav.no/dusseldorf/endringsmelding-pleiepenger/dist/' : '/familie/sykdom-i-familien/soknad/endringsmelding-pleiepenger/',
    build: {
        chunkSizeWarningLimit: 2000,
        sourcemap: true,
        minify: mode === 'production',
        target: 'esnext',
        rolldownOptions: {
            output: {
                codeSplitting: {
                    groups: [
                        { name: 'vendor', test: /node_modules[\\/](react|react-dom|react-intl)/, priority: 5 },
                        { name: 'router', test: /node_modules[\\/]react-router/, priority: 4 },
                        { name: 'forms', test: /node_modules[\\/]formik/, priority: 3 },
                        { name: 'utils', test: /node_modules[\\/](lodash|date-fns|dayjs|axios|uuid|zod)/, priority: 2 },
                        { name: 'navikt', test: /node_modules[\\/]@navikt[\\/](ds-react|aksel-icons)/, priority: 1 },
                    ],
                },
            },
        },
    },
}));
