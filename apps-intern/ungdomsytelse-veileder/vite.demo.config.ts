/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import { AppEnv } from './env.schema';
import tailwindcss from '@tailwindcss/vite';

const appSettings: AppEnv = {
    ENV: 'demo',
    APP_VERSION: 'dev',
    PUBLIC_PATH: '/sif-brukerdialog/ungdomsytelse-veileder',
    GITHUB_REF_NAME: 'local',

    SIF_PUBLIC_FEATURE_ENDRE_SLUTTDATO: 'on',
    SIF_PUBLIC_FEATURE_SJEKKLISTE: 'on',
    SIF_PUBLIC_FEATURE_SLETT_AKTIV_DELTAKELSE: 'on',

    UNG_DELTAKELSE_OPPLYSER_FRONTEND_PATH: '/api/ung-deltakelse-opplyser',
    UNG_DELTAKELSE_OPPLYSER_API_URL: 'http://localhost:8089',
    UNG_DELTAKELSE_OPPLYSER_API_SCOPE: 'dev-gcp:dusseldorf:ung-deltakelse-opplyser',

    SIF_PUBLIC_UMAMI_NETTSIDE_ID: 'abc',
    SIF_PUBLIC_USE_FARO: true,
    SIF_PUBLIC_NAIS_FRONTEND_TELEMETRY_COLLECTOR_URL: 'http://localhost:12347/collect',
};

const veileder = { name: 'Pål', NAVident: 'Z999999' };

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
                return html
                    .replace('{{{APP_SETTINGS}}}', JSON.stringify(appSettings))
                    .replace('{{{USER_INFO}}}', JSON.stringify(veileder));
            },
        },
    ],
    server: {
        port: 8088,
        proxy: {
            '/mockServiceWorker.js': {
                target: 'http://localhost:8088', // Adjust target URL if needed
                rewrite: () => '/sif-brukerdialog/ungdomsytelse-veileder/mockServiceWorker.js',
            },
        },
    },
    define: {
        __IS_VEILEDER_DEMO__: true,
        __IS_GITHUB_PAGES__: true,
        __VIS_DEMO_BRUKERE__: true,
    },
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
});
