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
            APP_VERSION: 'dev',
            NODE_ENV: 'development',
            PUBLIC_PATH: '/familie/sykdom-i-familien/soknad/pleiepenger',
            GITHUB_REF_NAME: 'dev',
            SIF_PUBLIC_APPSTATUS_DATASET: 'staging',
            SIF_PUBLIC_APPSTATUS_PROJECT_ID: 'ryujtq87',
            SIF_PUBLIC_DEKORATOR_URL: 'https://www.nav.no/dekoratoren/?simple=true&chatbot=false',
            SIF_PUBLIC_INNSYN_URL: 'https://www.nav.no/familie/sykdom-i-familien/soknad/innsyn/',
            SIF_PUBLIC_LOGIN_URL:
                'http://localhost:8081/auth-mock/cookie?subject=mockSubject&redirect_location=http://localhost:8080',
            SIF_PUBLIC_MINSIDE_URL: 'https://www.intern.dev.nav.no/minside',
            SIF_PUBLIC_USE_AMPLITUDE: 'false',
            MOCK_DATE: '2023-01-01',
            USE_MOCK_DATE: 'true',
            K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH:
                '/familie/sykdom-i-familien/soknad/pleiepenger/api/k9-brukerdialog',
            K9_BRUKERDIALOG_PROSESSERING_API_SCOPE: 'dev-gcp:dusseldorf:k9-brukerdialog-prosessering',
            K9_BRUKERDIALOG_PROSESSERING_API_URL: 'http://k9-brukerdialog-prosessering',
        },
    },
});
