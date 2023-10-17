/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import 'dotenv/config';

export default defineConfig({
    base: `${process.env.VITE_PUBLIC_PATH}`,
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
