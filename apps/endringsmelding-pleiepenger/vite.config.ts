/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import 'dotenv/config';

export default defineConfig({
    base: `${process.env.PUBLIC_PATH}`,
    plugins: [
        react({
            include: '**/*.{jsx,tsx}',
        }),
        checker({ typescript: true }),
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
