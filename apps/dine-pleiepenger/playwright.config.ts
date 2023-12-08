import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './e2e/playwright/tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: 'html',
    use: {
        trace: 'on-first-retry',
        launchOptions: {
            slowMo: 5,
        },
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
    webServer: {
        command: 'yarn start',
        url: 'http://localhost:8080',
        reuseExistingServer: true,
        env: {
            PUBLIC_PATH: '/dine-pleiepenger',
            API_URL: 'http://localhost:8089',
            APPSTATUS_PROJECT_ID: 'ryujtq87',
            APPSTATUS_DATASET: 'staging',
        },
    },
});
