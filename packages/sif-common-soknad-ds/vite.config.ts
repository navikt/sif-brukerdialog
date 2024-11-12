import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import Checker from 'vite-plugin-checker';

export default defineConfig({
    plugins: [react(), Checker({ typescript: true })],
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler',
            },
        },
    },
});
