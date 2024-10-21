import { defineConfig, devices } from '@playwright/test';
import { AppDevEnv } from './env.schema';

const env: AppDevEnv = {
    VELG_SCENARIO: 'on',
    NOW: '2023-01-01',
    APP_VERSION: 'dev',
    ENV: 'dev',
    GITHUB_REF_NAME: 'some_branch_name',
    PUBLIC_PATH: '/familie/sykdom-i-familien/soknad/endringsmelding-pleiepenger',

    SIF_PUBLIC_APPSTATUS_DATASET: 'staging',
    SIF_PUBLIC_APPSTATUS_PROJECT_ID: 'ryujtq87',
    SIF_PUBLIC_DEKORATOR_URL:
        'https://dekoratoren.ekstern.dev.nav.no/?simple=true&chatbot=false&urlLookupTable=false&logoutUrl=https://endringsmelding-pleiepenger.intern.dev.nav.no/oauth2/logout',
    SIF_PUBLIC_DOMAIN_URL: 'https://endringsmelding-pleiepenger.intern.dev.nav.no',
    SIF_PUBLIC_LOGIN_URL:
        'http://localhost:8081/auth-mock/cookie?subject=mockSubject&redirect_location=http://localhost:8080',
    SIF_PUBLIC_INNSYN_URL: 'https://dine-pleiepenger.intern.dev.nav.no/innsyn',
    SIF_PUBLIC_MINSIDE_URL: 'https://www.nav.no/minside',

    K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH:
        '/familie/sykdom-i-familien/soknad/endringsmelding-pleiepenger/api/k9-brukerdialog',
    K9_BRUKERDIALOG_PROSESSERING_API_SCOPE: 'dev-gcp:dusseldorf:k9-brukerdialog-prosessering',
    K9_BRUKERDIALOG_PROSESSERING_API_URL: 'http://k9-brukerdialog-prosessering',

    SIF_INNSYN_FRONTEND_PATH: '/familie/sykdom-i-familien/soknad/endringsmelding/api/sif-innsyn',
    SIF_INNSYN_API_URL: 'http://sif-innsyn-api',
    SIF_INNSYN_API_SCOPE: 'dev-gcp:dusseldorf:sif-innsyn-api',
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
        env,
    },
});
