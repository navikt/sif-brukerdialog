import { defineConfig } from 'cypress';

export default defineConfig({
    // projectId: 'fnodxc',
    e2e: {
        requestTimeout: 15000,
        testIsolation: false,
        // eslint-disable-next-line no-unused-vars
        setupNodeEvents(on, config) {},
        video: false,
    },
});
