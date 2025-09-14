/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';
import tailwindcss from '@tailwindcss/vite';
import { getDevAppSettings } from './mock/devAppSettings';

// Felles plugins som brukes i alle konfigurasjoner
export const commonPlugins = [
    tailwindcss(),
    react({
        include: '**/*.{tsx}',
    }),
    checker({ typescript: true }),
];

// Crossorigin plugin som brukes i de fleste konfigurasjoner
export const crossoriginPlugin = {
    name: 'crossorigin',
    transformIndexHtml(html: string) {
        return html.replace(/<link rel="stylesheet" crossorigin/g, '<link rel="stylesheet" type="text/css"');
    },
};

// HTML transform plugin for mock/demo miljøer
export const htmlTransformPlugin = {
    name: 'html-transform',
    transformIndexHtml: (html: string) => {
        return html.replace('{{{APP_SETTINGS}}}', JSON.stringify(getDevAppSettings()));
    },
};

// Felles server/preview konfig
export const serverConfig = {
    port: 8080,
    proxy: {
        '/mockServiceWorker.js': {
            target: 'http://localhost:8080',
            rewrite: () => '/ungdomsprogrammet/ytelsen/mockServiceWorker.js',
        },
    },
};

// Felles preview konfig (bruker samme proxy som server)
export const previewConfig = {
    port: 8080,
    proxy: serverConfig.proxy,
};

// Felles build konfig for demo/mock miljøer
export const demoBuildConfig = {
    sourcemap: true,
    rollupOptions: {
        input: './demo/index.html',
    },
    outDir: './dist-demo',
    emptyOutDir: true,
};

// Felles defines
export const commonDefines = {
    production: {
        __IS_GITHUB_PAGES__: false,
    },
    demo: {
        __IS_GITHUB_PAGES__: true,
    },
};

// Plugin presets for forskjellige miljøer
export const basicPlugins = [...commonPlugins, crossoriginPlugin];
export const mockPlugins = [...commonPlugins, crossoriginPlugin, htmlTransformPlugin];

// Base konfigurasjon for mock/demo miljøer
export const mockBaseConfig = {
    base: '/ungdomsprogrammet/ytelsen/',
    server: serverConfig,
    preview: previewConfig,
    build: demoBuildConfig,
};
