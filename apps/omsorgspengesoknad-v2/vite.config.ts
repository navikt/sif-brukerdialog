import { sentryVitePlugin } from '@sentry/vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';
import checker from 'vite-plugin-checker';

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
                          project: 'omsorgspengesoknad',
                          authToken: env.SENTRY_AUTH_TOKEN,
                      }),
                  ]
                : []),
        ],
        resolve: {
            alias: {
                '@app': resolve(__dirname, './src/app'),
            },
        },
        base: '/familie/sykdom-i-familien/soknad/omsorgspenger/',
        preview: {
            port: 8080,
        },
        server: {
            port: 8080,
            proxy: {
                '/mockServiceWorker.js': {
                    target: 'http://localhost:8080',
                    rewrite: () => '/familie/sykdom-i-familien/soknad/omsorgspenger/mockServiceWorker.js',
                },
            },
        },
        build: {
            sourcemap: true,
        },
    };
});
