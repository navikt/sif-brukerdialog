import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';

import { getBuildBranch } from './mock/getBuildBranch.ts';
import { getDevAppSettings } from './mock/devAppSettings.ts';
import { toHtmlSafeJson } from './mock/htmlSafeJson.ts';

// Må matche `base` under - MSW-workeren registreres på BASE_URL og får dermed
// dette som sitt scope. Rot-relative *_FRONTEND_PATH-verdier (f.eks. "/api/brukerdialog")
// havner utenfor scopet og treffer gh-pages i stedet for mock-handlerne.
const DEMO_PUBLIC_PATH = '/sif-brukerdialog/aktivitetspenger-soknad';

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
                        // Må ligge under MSW-workerens scope, se DEMO_PUBLIC_PATH over.
                        PUBLIC_PATH: DEMO_PUBLIC_PATH,
                        K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH: `${DEMO_PUBLIC_PATH}/api/brukerdialog`,
                        UNG_BRUKERDIALOG_API_FRONTEND_PATH: `${DEMO_PUBLIC_PATH}/api/ung-brukerdialog-api`,
                        UNG_DELTAKELSE_OPPLYSER_FRONTEND_PATH: `${DEMO_PUBLIC_PATH}/api/ung-deltakelse-opplyser`,
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
    base: `${DEMO_PUBLIC_PATH}/`,
    define: {
        __IS_GITHUB_PAGES__: true,
        __IS_DEMO__: true,
    },
    build: {
        sourcemap: true,
        outDir: './dist-demo',
        emptyOutDir: true,
    },
});
