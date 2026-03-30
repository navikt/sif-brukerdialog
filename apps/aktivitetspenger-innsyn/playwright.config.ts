import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './playwright/tests',
    fullyParallel: true,
    retries: process.env.CI ? 2 : 0,
    reporter: process.env.CI ? 'github' : 'list',
    use: {
        baseURL: 'http://127.0.0.1:4173/aktivitetspenger/innsyn/',
        trace: 'on-first-retry',
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
    webServer: {
        command: 'yarn pw:dev',
        url: 'http://127.0.0.1:4173/aktivitetspenger/innsyn/',
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
    },
});
