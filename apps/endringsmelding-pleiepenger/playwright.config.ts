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
        env: {
            SIF_PUBLIC_FEATURE_VELG_SCENARIO: 'on',
            NOW: '2023-01-01',
            SIF_PUBLIC_DEKORATOR_URL:
                'https://dekoratoren.ekstern.dev.nav.no/?simple=true&chatbot=false&urlLookupTable=false&logoutUrl=https://endringsmelding-pleiepenger.intern.dev.nav.no/oauth2/logout',
        },
    },
});
