/// <reference types="vitest" />
import { sentryVitePlugin } from '@sentry/vite-plugin';
import react from '@vitejs/plugin-react';
import * as path from 'path';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';

export default defineConfig({
    plugins: [
        react({
            include: '**/*.{jsx,tsx}',
        }),
        checker({ typescript: true }),
        {
            name: 'crossorigin',
            transformIndexHtml(html) {
                return html.replace(/<link rel="stylesheet" crossorigin/g, '<link rel="stylesheet" type="text/css"');
            },
        },
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
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler',
            },
        },
    },
});
