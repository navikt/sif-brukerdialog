import { defineConfig } from 'cypress';

export default defineConfig({
    // projectId: 'fnodxc',
    e2e: {
        testIsolation: false,
        // eslint-disable-next-line no-unused-vars
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
        video: false,
        screenshotOnRunFailure: false,
    },
});
