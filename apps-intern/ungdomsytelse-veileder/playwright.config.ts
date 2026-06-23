import { defineConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
    testDir: './playwright/tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: 'html',
    use: {
        trace: 'on-first-retry',
        launchOptions: {
            slowMo: 100,
        },
        baseURL: 'http://localhost:8088/sif-brukerdialog/ungdomsytelse-veileder/',
    },

    /* Configure projects for major browsers */
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'chromium-san-francisco',
            use: {
                ...devices['Desktop Chrome'],
                timezoneId: 'America/Los_Angeles',
            },
        },
        {
            name: 'chromium-sydney',
            use: {
                ...devices['Desktop Chrome'],
                timezoneId: 'Australia/Sydney',
            },
        },
    ],

    webServer: {
        command: 'pnpm pw:build && pnpm pw:start',
        url: 'http://localhost:8088/sif-brukerdialog/ungdomsytelse-veileder/',
        reuseExistingServer: true,
    },
});
