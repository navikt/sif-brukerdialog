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
        base: mode === 'production' ? 'https://cdn.nav.no/dusseldorf/sif-demo-app/dist/' : '/sif-demo/',
        preview: {
            port: 8080,
        },
        server: {
            port: 8080,
            proxy: {
                '/mockServiceWorker.js': {
                    target: 'http://localhost:8080',
                    rewrite: () => '/sif-demo/mockServiceWorker.js',
                },
            },
        },
        build: {
            sourcemap: 'inline',
            minify: mode === 'production',
        },
        define: {
            __SCENARIO_HEADER__: false,
        },
    };
});
