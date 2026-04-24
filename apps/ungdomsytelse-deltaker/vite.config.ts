/// <reference types="vitest" />
import { sentryVitePlugin } from '@sentry/vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import checker from 'vite-plugin-checker';

import { createAliasConfig } from './vite.shared';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    const hasSentryAuthToken = Boolean(env.SENTRY_AUTH_TOKEN);

    return {
        plugins: [
            tailwindcss(),
            react({
                include: '**/*.{tsx}',
            }),
            checker({ typescript: true }),
            ...(hasSentryAuthToken
                ? [
                      sentryVitePlugin({
                          org: 'nav',
                          project: 'ungdomsytelse-deltaker',
                          authToken: env.SENTRY_AUTH_TOKEN,
                      }),
                  ]
                : []),
            {
                name: 'crossorigin',
                transformIndexHtml(html) {
                    return html.replace(
                        /<link rel="stylesheet" crossorigin/g,
                        '<link rel="stylesheet" type="text/css"',
                    );
                },
            },
        ],
        resolve: {
            alias: createAliasConfig(),
        },
        define: {
            __IS_GITHUB_PAGES__: false,
            __IS_VEILEDER_DEMO__: false,
            __INJECT_DECORATOR_CLIENT_SIDE__: false,
            __USE_FIXED_MOCKED_DATE__: false,
        },
        server: {
            port: 8080,
        },
        build: {
            chunkSizeWarningLimit: 2000,
            sourcemap: true,
            minify: mode === 'production',
            rolldownOptions: {
                output: {
                    codeSplitting: {
                        groups: [
                            { name: 'vendor', test: /node_modules[\\/](react|react-dom|react-intl)/, priority: 5 },
                            { name: 'router', test: /node_modules[\\/]react-router/, priority: 4 },
                            { name: 'aksel', test: /node_modules[\\/]@navikt[\\/](ds-react|aksel-icons)/, priority: 3 },
                        ],
                    },
                },
            },
        },
    };
});
