import { defineConfig } from 'cypress';

export default defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
        screenshotOnRunFailure: false,
        video: false,
        projectId: '5485qe',
        baseUrl: 'http://localhost:8080/soknad',
    },
});
