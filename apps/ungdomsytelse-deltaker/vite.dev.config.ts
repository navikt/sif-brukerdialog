/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import * as dotenv from 'dotenv';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import { AppEnv } from './env.schema';
import tailwindcss from '@tailwindcss/vite';

dotenv.config();

export const getAppSettings = (): AppEnv & { VITE: true } => ({
    VITE: true,

    ENV: `${process.env.ENV}`,
    APP_VERSION: `${process.env.APP_VERSION}`,
    GITHUB_REF_NAME: `${process.env.GITHUB_REF_NAME}`,
    PUBLIC_PATH: `${process.env.PUBLIC_PATH}`,

    SIF_PUBLIC_PERSONALIA_URL: `${process.env.SIF_PUBLIC_PERSONALIA_URL}`,
    VELG_SCENARIO: `${process.env.VELG_SCENARIO}`,

    SIF_PUBLIC_AMPLITUDE_API_KEY: `${process.env.SIF_PUBLIC_AMPLITUDE_API_KEY}`,
    SIF_PUBLIC_APPSTATUS_DATASET: `${process.env.SIF_PUBLIC_APPSTATUS_DATASET}`,
    SIF_PUBLIC_APPSTATUS_PROJECT_ID: `${process.env.SIF_PUBLIC_APPSTATUS_PROJECT_ID}`,
    SIF_PUBLIC_DEKORATOR_URL: `${process.env.SIF_PUBLIC_DEKORATOR_URL}`,
    SIF_PUBLIC_LOGIN_URL: `${process.env.SIF_PUBLIC_LOGIN_URL}`,
    SIF_PUBLIC_MINSIDE_URL: `${process.env.SIF_PUBLIC_MINSIDE_URL}`,
    SIF_PUBLIC_USE_AMPLITUDE: `${process.env.SIF_PUBLIC_USE_AMPLITUDE}`,

    K9_BRUKERDIALOG_PROSESSERING_API_URL: `${process.env.K9_BRUKERDIALOG_PROSESSERING_API_URL}`,
    K9_BRUKERDIALOG_PROSESSERING_API_SCOPE: `${process.env.K9_BRUKERDIALOG_PROSESSERING_API_SCOPE}`,
    K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH: `${process.env.K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH}`,

    UNG_DELTAKELSE_OPPLYSER_API_URL: `${process.env.UNG_DELTAKELSE_OPPLYSER_API_URL}`,
    UNG_DELTAKELSE_OPPLYSER_API_SCOPE: `${process.env.UNG_DELTAKELSE_OPPLYSER_API_SCOPE}`,
    UNG_DELTAKELSE_OPPLYSER_FRONTEND_PATH: `${process.env.UNG_DELTAKELSE_OPPLYSER_FRONTEND_PATH}`,

    SIF_PUBLIC_URL_RETT_OG_PLIKT: `${process.env.SIF_PUBLIC_URL_RETT_OG_PLIKT}`,
    SIF_PUBLIC_URL_PERSONOPPLYSNINGER: `${process.env.SIF_PUBLIC_URL_PERSONOPPLYSNINGER}`,
    SIF_PUBLIC_URL_PERSONVERN: `${process.env.SIF_PUBLIC_URL_PERSONVERN}`,
    SIF_PUBLIC_URL_OM_UNGDOMSPROGRAMYTELSEN: `${process.env.SIF_PUBLIC_URL_OM_UNGDOMSPROGRAMYTELSEN}`,
    SIF_PUBLIC_URL_SKATTEETATEN: `${process.env.SIF_PUBLIC_URL_SKATTEETATEN}`,
    SIF_PUBLIC_URL_ENDRE_KONTONUMMER: `${process.env.SIF_PUBLIC_URL_ENDRE_KONTONUMMER}`,
    SIF_PUBLIC_URL_SKRIV_TIL_OSS: `${process.env.SIF_PUBLIC_URL_SKRIV_TIL_OSS}`,
});

export default defineConfig({
    plugins: [
        tailwindcss(),
        react({
            include: '**/*.{tsx}',
        }),
        checker({ typescript: true }),
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
                rewrite: () => '/sif-brukerdialog/ungdomsytelse-deltaker/mockServiceWorker.js',
            },
        },
    },
    preview: {
        port: 8080,
        proxy: {
            '/mockServiceWorker.js': {
                target: 'http://localhost:8080', // Adjust target URL if needed
                rewrite: () => '/sif-brukerdialog/ungdomsytelse-deltaker/mockServiceWorker.js',
            },
        },
    },
    base: '/sif-brukerdialog/ungdomsytelse-deltaker/',
    build: {
        sourcemap: true,
        rollupOptions: {
            input: './demo/index.html',
        },
        outDir: './dist-demo',
        emptyOutDir: true,
    },
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler',
            },
        },
    },
});
