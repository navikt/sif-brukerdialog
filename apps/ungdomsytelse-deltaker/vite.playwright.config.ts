/// <reference types="vitest" />
import { defineConfig } from 'vite';

import { commonDefines, mockBaseConfig, mockPlugins } from './vite.shared.config';

export default defineConfig({
    mode: 'playwright',
    plugins: mockPlugins,
    define: commonDefines.demo,
    ...mockBaseConfig,
});
