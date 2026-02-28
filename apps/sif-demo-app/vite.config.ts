import { resolve } from 'path';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';

export default defineConfig({
    plugins: [
        tailwindcss(),
        react({
            include: '**/*.{tsx}',
        }),
        checker({ typescript: true }),
    ],
    resolve: {
        alias: {
            '@rammeverk': resolve(__dirname, './src/rammeverk'),
            '@app': resolve(__dirname, './src/app'),
        },
    },
    server: {
        port: 8080,
    },
    build: {
        sourcemap: true,
    },
});
