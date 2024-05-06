/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';

const path = require('path');

export default defineConfig({
    plugins: [
        react({
            include: '**/*.{jsx,tsx}',
        }),
        checker({ typescript: true }),
    ],
    resolve: {
        alias: {
            '@i18n': path.resolve(__dirname, './src/app/i18n'),
        },
    },
    build: {
        sourcemap: true,
    },
});
