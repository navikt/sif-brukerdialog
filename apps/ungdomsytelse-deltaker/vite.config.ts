/// <reference types="vitest" />
import { defineConfig } from 'vite';

import { basicPlugins, commonDefines } from './vite.shared.config';

export default defineConfig({
    plugins: basicPlugins,
    define: commonDefines.production,
    server: {
        port: 8080,
    },
    build: {
        sourcemap: true,
    },
});
