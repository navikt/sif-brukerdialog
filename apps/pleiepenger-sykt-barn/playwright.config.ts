import { defineConfig, devices } from '@playwright/test';
import { playwrightEnv } from './e2e/playwright/playwright.env';

export default defineConfig({
    testDir: './e2e/playwright/tests',
    maxFailures: 2,
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: 'html',
    use: {
        trace: 'on-first-retry',
        launchOptions: {
            slowMo: 20,
        },
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
    webServer: {
        command: 'yarn start-e2e-server',
        url: 'http://localhost:8080',
        reuseExistingServer: true,
        timeout: 60000,
        env: playwrightEnv,
    },
});
