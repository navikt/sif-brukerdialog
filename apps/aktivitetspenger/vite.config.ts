/// <reference types="vitest" />
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';

import { createAliasConfig } from './vite.shared';

export default defineConfig({
    plugins: [
        tailwindcss(),
        react({
            include: '**/*.{tsx}',
        }),
        checker({ typescript: true }),
        {
            name: 'crossorigin',
            transformIndexHtml(html) {
                return html.replace(/<link rel="stylesheet" crossorigin/g, '<link rel="stylesheet" type="text/css"');
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
        sourcemap: true,
    },
});
