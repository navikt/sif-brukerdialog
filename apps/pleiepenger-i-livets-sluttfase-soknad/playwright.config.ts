import { defineConfig, devices } from '@playwright/test';
import { AppEnv } from './env.schema';

const env: AppEnv = {
    ENV: 'dev',
    APP_VERSION: 'dev',
    PUBLIC_PATH: '/familie/sykdom-i-familien/soknad/pleiepenger-i-livets-sluttfase',
    GITHUB_REF_NAME: 'main',
    SIF_PUBLIC_APPSTATUS_DATASET: 'staging',
    SIF_PUBLIC_APPSTATUS_PROJECT_ID: 'ryujtq87',
    SIF_PUBLIC_USE_AMPLITUDE: 'false',
    SIF_PUBLIC_DEKORATOR_URL: 'https://dekoratoren.ekstern.dev.nav.no/?simple=true&chatbot=false&urlLookupTable=false&',
    SIF_PUBLIC_LOGIN_URL:
        'ttp://localhost:8089/auth-mock/cookie?subject=mockSubject&redirect_location=http://localhost:8080',
    SIF_PUBLIC_MINSIDE_URL: 'https://www.intern.dev.nav.no/minside',
    K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH:
        '/familie/sykdom-i-familien/soknad/pleiepenger-i-livets-sluttfase/api/k9-brukerdialog',
    K9_BRUKERDIALOG_PROSESSERING_API_SCOPE: 'dev-gcp:dusseldorf:k9-brukerdialog-prosessering',
    K9_BRUKERDIALOG_PROSESSERING_API_URL: 'http://k9-brukerdialog-prosessering',
};

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
        env,
    },
});
