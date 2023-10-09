import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import Checker from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            common: path.resolve(__dirname, './src/common'),
            dev: path.resolve(__dirname, './src/dev'),
        },
    },
    plugins: [react(), Checker({ typescript: true })],
});
