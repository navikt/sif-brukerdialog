import { defineConfig } from 'cypress';

export default defineConfig({
    projectId: 'fnodxc',
    e2e: {
        baseUrl: 'http://localhost:8080',
        requestTimeout: 15000,
        testIsolation: false,
        setupNodeEvents() {},
        video: false,
    },
});
