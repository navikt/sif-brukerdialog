import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';

export default defineConfig(({ mode }) => {
    return {
        plugins: [
            tailwindcss(),
            react({
                include: '**/*.{tsx}',
            }),
            checker({ typescript: true }),
        ],
        resolve: {
            alias: {
                '@app': resolve(__dirname, './src/app'),
            },
        },
        base: '/aktivitetspenger/innsyn/',
        preview: {
            port: 8080,
        },
        define: {
            __IS_DEMO__: false,
            __INJECT_DECORATOR_CLIENT_SIDE__: false,
            __USE_FIXED_MOCKED_DATE__: false,
            __IS_GITHUB_PAGES__: false,
        },
        server: {
            port: 8080,
            proxy: {
                '/mockServiceWorker.js': {
                    target: 'http://localhost:8080',
                    rewrite: () => '/aktivitetspenger/innsyn/mockServiceWorker.js',
                },
            },
        },
        build: {
            sourcemap: true,
            minify: mode === 'production',
        },
    };
});
