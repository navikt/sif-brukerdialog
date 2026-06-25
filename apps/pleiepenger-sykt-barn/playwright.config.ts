import { defineConfig, devices } from '@playwright/test';

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
    },
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
    ],
    webServer: {
        command: 'pnpm pw:build && pnpm pw:start',
        url: 'http://localhost:8080',
        reuseExistingServer: true,
    },
});
