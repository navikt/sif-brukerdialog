import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [react()],
    base: '/sif-brukerdialog/',
    server: {
        port: 5180,
    },
    preview: {
        port: 5180,
    },
    build: {
        outDir: 'dist',
        emptyOutDir: true,
    },
});
