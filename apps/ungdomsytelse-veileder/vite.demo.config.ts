/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import { AppEnv } from './env.schema';
import tailwindcss from '@tailwindcss/vite';

const appSettings: AppEnv = {
    ENV: 'development',
    APP_VERSION: 'dev',
    PUBLIC_PATH: 'sif-brukerdialog/ungdomsytelse-veileder',
    GITHUB_REF_NAME: 'local',

    UNG_DELTAKELSE_OPPLYSER_FRONTEND_PATH: 'api/ung-deltakelse-opplyser',
    UNG_DELTAKELSE_OPPLYSER_API_URL: 'http://localhost:8089',
    UNG_DELTAKELSE_OPPLYSER_API_SCOPE: 'dev-gcp:dusseldorf:ung-deltakelse-opplyser',

    SIF_PUBLIC_USE_MSW: true,
    SIF_PUBLIC_USE_FARO: true,
    SIF_PUBLIC_NAIS_FRONTEND_TELEMETRY_COLLECTOR_URL: 'http://localhost:12347/collect',
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
