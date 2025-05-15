/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import * as dotenv from 'dotenv';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import tailwindcss from '@tailwindcss/vite';
import { AppEnv } from './env.schema';

dotenv.config();

const appSettings: AppEnv = {
    ENV: `${process.env.ENV}`,
    APP_VERSION: `${process.env.APP_VERSION}`,
    GITHUB_REF_NAME: `${process.env.GITHUB_REF_NAME}`,
    PUBLIC_PATH: `${process.env.PUBLIC_PATH}`,
    UNG_DELTAKELSE_OPPLYSER_API_URL: `${process.env.UNG_DELTAKELSE_OPPLYSER_API_URL}`,
    UNG_DELTAKELSE_OPPLYSER_FRONTEND_PATH: `${process.env.UNG_DELTAKELSE_OPPLYSER_FRONTEND_PATH}`,
    UNG_DELTAKELSE_OPPLYSER_API_SCOPE: `${process.env.UNG_DELTAKELSE_OPPLYSER_API_SCOPE}`,
    SIF_PUBLIC_IS_LOCAL: true,
};

const veileder = { name: 'Pål', NAVident: 'Z999999' };

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
