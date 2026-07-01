import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';

import { getDevAppSettings } from './mock/devAppSettings';

export default defineConfig(({ mode }) => {
    const isE2E = mode === 'playwright';
    const appSettings = {
        ...getDevAppSettings(),
        ...(isE2E && { SIF_PUBLIC_USE_ANALYTICS: 'false', SIF_PUBLIC_USE_FARO: 'false' }),
    };
    const host = isE2E ? '127.0.0.1' : 'localhost';
    const port = isE2E ? 4173 : 8080;

    return {
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
                    return html.replace(
                        /<link rel="stylesheet" crossorigin/g,
                        '<link rel="stylesheet" type="text/css"',
                    );
                },
            },
            {
                name: 'html-transform',
                transformIndexHtml: (html) => {
                    return html.replace('{{{APP_SETTINGS}}}', JSON.stringify(appSettings));
                },
            },
        ],
        resolve: {
            alias: {
                '@app': resolve(__dirname, './src/app'),
            },
        },
        base: '/aktivitetspenger/soknad/',
        preview: {
            port,
        },
        server: {
            host,
            port,
            proxy: {
                '/mockServiceWorker.js': {
                    target: `http://${host}:${port}`,
                    rewrite: () => '/aktivitetspenger/soknad/mockServiceWorker.js',
                },
            },
        },
        build: {
            sourcemap: true,
        },
        define: isE2E
            ? {
                  __IS_DEMO__: false,
                  __INJECT_DECORATOR_CLIENT_SIDE__: false,
                  __USE_FIXED_MOCKED_DATE__: true,
                  __IS_GITHUB_PAGES__: false,
                  __SCENARIO_HEADER__: false,
              }
            : {
                  __SCENARIO_HEADER__: true,
              },
    };
});
