import { defineConfig, devices } from '@playwright/test';

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
        env: {
            API_URL_INNSYN: 'http://localhost:8089',
            API_URL: 'http://localhost:8089',
            APP_VERSION: 'dev',
            APPSTATUS_DATASET: 'staging',
            APPSTATUS_PROJECT_ID: 'ryujtq87',
            DEKORATOR_URL: 'https://www.nav.no/dekoratoren/?simple=true&chatbot=false',
            FRONTEND_API_PATH: 'http://localhost:8089/',
            FRONTEND_INNSYN_API_PATH: 'http://localhost:8089/',
            GITHUB_REF_NAME: 'dev',
            INNSYN_URL: 'https://www.nav.no/familie/sykdom-i-familien/soknad/innsyn/',
            LOGIN_URL:
                'http://localhost:8081/auth-mock/cookie?subject=mockSubject&redirect_location=http://localhost:8080',
            MIN_SIDE_URL: 'https://www.intern.dev.nav.no/minside',
            NODE_ENV: 'development',
            PUBLIC_PATH: '/familie/sykdom-i-familien/soknad/pleiepenger',
            USE_AMPLITUDE: 'false',
            USE_MOCK_DATE: 'true',
            MOCK_DATE: '2023-01-01',
        },
    },
});
