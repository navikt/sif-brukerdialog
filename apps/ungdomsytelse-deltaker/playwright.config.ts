import { defineConfig, devices } from '@playwright/test';
import { playwrightEnv } from './e2e/playwright/playwright.env';

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
            slowMo: 100,
        },
        baseURL: 'http://localhost:8080/sif-brukerdialog/ungdomsytelse-deltaker/',
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
    webServer: {
        command: 'yarn start:dist-demo',
        url: 'http://localhost:8080/sif-brukerdialog/ungdomsytelse-deltaker/',
        reuseExistingServer: true,
        env: playwrightEnv,
    },
});
