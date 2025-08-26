/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import { AppEnv } from './env.schema';
import tailwindcss from '@tailwindcss/vite';

export const getAppSettings = (): AppEnv & { VITE: string } => ({
    VITE: 'true',

    ENV: 'development',
    APP_VERSION: 'dev',
    GITHUB_REF_NAME: 'dev',
    PUBLIC_PATH: '/ungdomsprogrammet/ytelsen',

    VELG_SCENARIO: 'on',

    SIF_PUBLIC_AMPLITUDE_API_KEY: 'default',
    SIF_PUBLIC_APPSTATUS_DATASET: 'production',
    SIF_PUBLIC_APPSTATUS_PROJECT_ID: 'ryujtq87',
    SIF_PUBLIC_DEKORATOR_URL: 'https://dekoratoren.ekstern.dev.nav.no/?simple=true&chatbot=false&urlLookupTable=false',
    SIF_PUBLIC_LOGIN_URL:
        'https://ungdomsytelse-deltaker.intern.dev.nav.no/oauth2/login?redirect=/ungdomsytelse-deltaker',
    SIF_PUBLIC_MINSIDE_URL: 'https://www.intern.dev.nav.no/minside',
    SIF_PUBLIC_USE_AMPLITUDE: 'true',

    SIF_PUBLIC_USE_FARO: process.env.SIF_PUBLIC_USE_FARO,
    SIF_PUBLIC_NAIS_FRONTEND_TELEMETRY_COLLECTOR_URL: `${process.env.SIF_PUBLIC_NAIS_FRONTEND_TELEMETRY_COLLECTOR_URL}`,

    K9_BRUKERDIALOG_PROSESSERING_API_URL: 'http://k9-brukerdialog-prosessering',
    K9_BRUKERDIALOG_PROSESSERING_API_SCOPE: 'dev-gcp:dusseldorf:k9-brukerdialog-prosessering',
    K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH: '/api/brukerdialog',

    UNG_DELTAKELSE_OPPLYSER_API_URL: 'http://ung-deltakelse-opplyser.k9saksbehandling',
    UNG_DELTAKELSE_OPPLYSER_API_SCOPE: 'dev-gcp:k9saksbehandling:ung-deltakelse-opplyser',
    UNG_DELTAKELSE_OPPLYSER_FRONTEND_PATH: '/api/ung-deltakelse-opplyser',

    SIF_PUBLIC_URL_RETT_OG_PLIKT: 'https://www.ansatt.dev.nav.no/endringer',
    SIF_PUBLIC_URL_PERSONOPPLYSNINGER: 'https://www.ansatt.dev.nav.no/person/personopplysninger/nb/',
    SIF_PUBLIC_URL_PERSONVERN: 'https://www.ansatt.dev.nav.no/personvernerklaering',
    SIF_PUBLIC_URL_OM_UNGDOMSPROGRAMYTELSEN: 'https://www.ansatt.dev.nav.no/personvernerklaering',
    SIF_PUBLIC_URL_SKATTEETATEN: 'https://www.skatteetaten.no',
    SIF_PUBLIC_URL_ENDRE_KONTONUMMER: 'https://www.ansatt.dev.nav.no/start/soknad-endring-bankkontonummer',
    SIF_PUBLIC_URL_SKRIV_TIL_OSS: 'https://www.nav.no/skriv-til-oss',
    SIF_PUBLIC_URL_DOKUMENTARKIV: 'https://www.dev.nav.no/dokumentarkiv/tema/UNG',
});

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
                return html.replace('{{{APP_SETTINGS}}}', JSON.stringify(getAppSettings()));
            },
        },
    ],
    define: {
        __IS_GITHUB_PAGES__: false,
    },
    server: {
        port: 8080,
        proxy: {
            '/mockServiceWorker.js': {
                target: 'http://localhost:8080', // Adjust target URL if needed
                rewrite: () => '/ungdomsprogrammet/ytelsen/mockServiceWorker.js',
            },
        },
    },
    preview: {
        port: 8080,
        proxy: {
            '/mockServiceWorker.js': {
                target: 'http://localhost:8080', // Adjust target URL if needed
                rewrite: () => '/ungdomsprogrammet/ytelsen/mockServiceWorker.js',
            },
        },
    },
    base: '/ungdomsprogrammet/ytelsen/',
    build: {
        sourcemap: true,
        rollupOptions: {
            input: './demo/index.html',
        },
        outDir: './dist-demo',
        emptyOutDir: true,
    },
});
