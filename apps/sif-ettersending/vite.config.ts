/* eslint-disable @typescript-eslint/no-unused-vars */
/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import 'dotenv/config';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';

export default defineConfig({
    base: process.env.PUBLIC_PATH || '/familie/sykdom-i-familien/soknad/ettersending',
    plugins: [
        react({
            include: '**/*.{jsx,tsx}',
        }),
        checker({ typescript: true }),
    ],
    resolve: {},
    build: {
        sourcemap: true,
    },
});
