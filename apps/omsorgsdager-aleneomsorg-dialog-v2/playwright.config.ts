import { defineConfig, devices } from '@playwright/test';

const baseUrl =
    'http://127.0.0.1:4173/familie/sykdom-i-familien/soknad/omsorgsdager-aleneomsorg/';

export default defineConfig({
    testDir: './playwright/tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    reporter: process.env.CI ? 'github' : 'list',
    use: {
        baseURL: baseUrl,
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
    webServer: {
        command: process.env.CI ? 'pnpm pw:start' : 'pnpm pw:build && pnpm pw:start',
        url: baseUrl,
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
    },
});
