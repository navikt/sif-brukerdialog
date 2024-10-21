import { defineConfig, devices } from '@playwright/test';
import { AppEnv } from './env.schema';

const env: AppEnv = {
    ENV: 'dev',
    APP_VERSION: 'dev',
    PUBLIC_PATH: '/familie/sykdom-i-familien/soknad/omsorgsdager-aleneomsorg',
    GITHUB_REF_NAME: 'main',
    SIF_PUBLIC_APPSTATUS_DATASET: 'staging',
    SIF_PUBLIC_APPSTATUS_PROJECT_ID: 'ryujtq87',
    SIF_PUBLIC_DEKORATOR_URL:
        'https://dekoratoren.ekstern.dev.nav.no/?simple=true&chatbot=false&urlLookupTable=false&logoutUrl=https://omsorgsdager-aleneomsorg-dialog.intern.dev.nav.no/oauth2/logout&redirectToApp=true',
    SIF_PUBLIC_LOGIN_URL:
        'https://omsorgsdager-aleneomsorg-dialog.intern.dev.nav.no/oauth2/login?redirect=/familie/sykdom-i-familien/soknad/omsorgsdager-aleneomsorg/soknad',
    SIF_PUBLIC_MINSIDE_URL: 'https://www.intern.dev.nav.no/minside',
    SIF_PUBLIC_OMS_IKKE_TILSYN_URL: 'https://ekstra-omsorgsdager-andre-forelder-ikke-tilsyn.intern.dev.nav.no/',
    SIF_PUBLIC_USE_FARO: 'true',
    K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH: '/api/brukerdialog',
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
        env,
    },
});
