/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import { sentryVitePlugin } from '@sentry/vite-plugin';
import path from 'path';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';

export default defineConfig({
    plugins: [
        react({
            include: '**/*.{jsx,tsx}',
        }),
        checker({ typescript: true }),
        ...[
            process.env.SENTRY_AUTH_TOKEN
                ? [
                      sentryVitePlugin({
                          org: 'nav',
                          project: 'sykdom-i-familien',
                          authToken: process.env.SENTRY_AUTH_TOKEN,
                      }),
                  ]
                : [],
        ],
    ],
    resolve: {
        alias: {
            '@utils': path.resolve(__dirname, './src/app/utils'),
            '@types': path.resolve(__dirname, './src/app/types'),
            '@hooks': path.resolve(__dirname, './src/app/hooks'),
        },
    },
    build: {
        sourcemap: true,
    },
});
