/// <reference types="vitest" />
import { defineConfig } from 'vite';

import { commonDefines, mockBaseConfig, mockPlugins } from './vite.shared.config';

export default defineConfig({
    mode: 'msw',
    plugins: mockPlugins,
    define: commonDefines.demo,
    ...mockBaseConfig,
    // Overskriv base kun for demo-build (gh-pages)
    base: '/sif-brukerdialog/ungdomsytelse-deltaker/',
    // Overskriv MSW-proxy kun for demo-build
    server: {
        ...mockBaseConfig.server,
        proxy: {
            ...mockBaseConfig.server.proxy,
            '/mockServiceWorker.js': {
                target: 'http://localhost:8080',
                rewrite: () => '/sif-brukerdialog/ungdomsytelse-deltaker/mockServiceWorker.js',
            },
        },
    },
    preview: {
        ...mockBaseConfig.preview,
        proxy: {
            ...mockBaseConfig.preview.proxy,
            '/mockServiceWorker.js': {
                target: 'http://localhost:8080',
                rewrite: () => '/sif-brukerdialog/ungdomsytelse-deltaker/mockServiceWorker.js',
            },
        },
    },
});
