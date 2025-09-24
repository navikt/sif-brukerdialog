/// <reference types="vitest" />
import { defineConfig } from 'vite';

import { commonDefines, mockBaseConfig, mockPlugins } from './vite.shared.config';

export default defineConfig({
    mode: 'msw',
    plugins: mockPlugins,
    define: commonDefines.demo,
    ...mockBaseConfig,
});
