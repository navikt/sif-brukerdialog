/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';

export default defineConfig({
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
