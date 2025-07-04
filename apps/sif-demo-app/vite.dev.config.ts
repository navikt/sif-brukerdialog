/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import * as dotenv from 'dotenv';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import { AppEnv } from './env.schema';
import tailwindcss from '@tailwindcss/vite';

dotenv.config();

export const getAppSettings = (): AppEnv & { VITE: string } => ({
    ENV: `${process.env.ENV}`,
    APP_VERSION: `${process.env.APP_VERSION}`,
    GITHUB_REF_NAME: `${process.env.GITHUB_REF_NAME}`,
    PUBLIC_PATH: `${process.env.PUBLIC_PATH}`,
    VITE: 'true',

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
    },
    preview: {
        port: 8080,
    },
    base: '/',
    build: {
        sourcemap: true,
        rollupOptions: {
            input: './index.html',
        },
        outDir: './dist-demo',
        emptyOutDir: true,
    },
});
