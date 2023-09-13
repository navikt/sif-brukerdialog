const { defineConfig } = require('cypress');

module.exports = defineConfig({
    e2e: {
        // projectId: 'fnodxc',
        baseUrl: 'http://localhost:8080',
        testIsolation: false,
        requestTimeout: 15000,
        setupNodeEvents(on, config) {
            return require('./cypress/plugins/index.js')(on, config);
        },
        video: false,
    },
});
