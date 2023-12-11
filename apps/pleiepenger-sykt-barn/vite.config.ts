/* eslint-disable @typescript-eslint/no-unused-vars */
/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import { sentryVitePlugin } from '@sentry/vite-plugin';

export default defineConfig({
    plugins: [
        react({
            include: '**/*.{jsx,tsx}',
        }),
        checker({ typescript: true }),
        sentryVitePlugin({
            org: 'nav',
            project: 'sykdom-i-familien',
            authToken: process.env.SENTRY_AUTH_TOKEN,
        }),
    ],
    resolve: {},
    build: {
        sourcemap: true,
    },
});
