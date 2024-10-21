import { defineConfig, devices } from '@playwright/test';
import { AppEnv } from './env.schema';

const env: AppEnv = {
    ENV: 'dev',
    APP_VERSION: 'dev',
    PUBLIC_PATH: '/familie/sykdom-i-familien/soknad/ettersending',
    GITHUB_REF_NAME: 'branch-name',
    SIF_PUBLIC_APPSTATUS_DATASET: 'staging',
    SIF_PUBLIC_APPSTATUS_PROJECT_ID: 'ryujtq87',
    SIF_PUBLIC_DEKORATOR_URL:
        'https://www.nav.no/dekoratoren/?simple=true&chatbot=false&logoutUrl=https://www.nav.no/familie/sykdom-i-familien/soknad/ettersending/oauth2/logout',
    SIF_PUBLIC_ENDRINGSMELDING_PP: 'https://endringsmelding-pleiepenger.intern.dev.nav.no',
    SIF_PUBLIC_INNSYN_PP: 'https://https://dine-pleiepenger.intern.dev.nav.no/',
    SIF_PUBLIC_LOGIN_URL:
        'http://localhost:8081/auth-mock/cookie?subject=mockSubject&redirect_location=http://localhost:8080',
    SIF_PUBLIC_MINSIDE_URL: 'https://www.nav.no/minside',
    SIF_PUBLIC_PLEIEPENGER_SYKT_BARN_URL: 'https://pleiepengesoknad.intern.dev.nav.no',
    K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH: '/familie/sykdom-i-familien/soknad/ettersending/api/k9-brukerdialog',
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
