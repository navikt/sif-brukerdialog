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
            slowMo: 50,
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
        env: {
            SIF_PUBLIC_DEKORATOR_URL: 'https://www.nav.no/dekoratoren/?simple=true&chatbot=false',
            PUBLIC_PATH: '/familie/sykdom-i-familien/soknad/omsorgspengerutbetaling',
            K9_BRUKERDIALOG_PROSESSERING_API_URL: 'http://localhost:8089',
            K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH: 'http://localhost:8089',
            SIF_PUBLIC_FRONTEND_VEDLEGG_URL: 'http://localhost:8089',
            SIF_PUBLIC_VEDLEGG_API_URL: 'http://localhost:8089',
            SIF_PUBLIC_APPSTATUS_PROJECT_ID: 'ryujtq87',
            SIF_PUBLIC_APPSTATUS_DATASET: 'staging',
            USE_MOCK_DATE: 'true',
            MOCK_DATE: '2024-08-01',
        },
    },
});
