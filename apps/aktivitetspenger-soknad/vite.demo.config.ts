import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';

import { getBuildBranch } from './mock/getBuildBranch.ts';
import { getDevAppSettings } from './mock/devAppSettings.ts';
import { toHtmlSafeJson } from './mock/htmlSafeJson.ts';

export default defineConfig({
    mode: 'msw',
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
        {
            name: 'html-transform',
            transformIndexHtml: (html) => {
                return html.replace('{{{APP_SETTINGS}}}', () =>
                    toHtmlSafeJson({
                        ...getDevAppSettings(),
                        GITHUB_REF_NAME: getBuildBranch(),
                        // Demoen er offentlig - ingen analytics og ingen lenker ut til interne dev-flater.
                        SIF_PUBLIC_USE_ANALYTICS: 'false',
                        SIF_PUBLIC_AKTIVITETSPENGER_INNSYN_URL: '#',
                        SIF_PUBLIC_SEND_BESKJED: '#',
                    }),
                );
            },
        },
    ],
    resolve: {
        alias: {
            '@app': resolve(import.meta.dirname, './src/app'),
        },
    },
    base: '/sif-brukerdialog/aktivitetspenger-soknad/',
    define: {
        __IS_GITHUB_PAGES__: true,
        __SCENARIO_HEADER__: true,
    },
    build: {
        sourcemap: true,
        outDir: './dist-demo',
        emptyOutDir: true,
    },
});
