import { defineConfig } from 'cypress';

export default defineConfig({
    projectId: 'fnodxc',
    env: {
        MSW: 'off',
    },
    e2e: {
        testIsolation: false,
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
        video: false,
        baseUrl: 'http://localhost:8080/soknad',
    },
});
