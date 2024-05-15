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
            slowMo: 100,
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
            DEKORATOR_URL: 'https://www.nav.no/dekoratoren/?simple=true&chatbot=false',
            PUBLIC_PATH: 'familie/sykdom-i-familien/soknad/endringsmelding-pleiepenger',
            API_URL: 'http://localhost:8089',
            FRONTEND_API_PATH: 'http://localhost:8089',
            FRONTEND_VEDLEGG_URL: 'http://localhost:8089',
            VEDLEGG_API_URL: 'http://localhost:8089',
            APPSTATUS_PROJECT_ID: 'ryujtq87',
            APPSTATUS_DATASET: 'staging',
            MSW: 'off',
            NOW: '2023-01-01',
        },
    },
});
