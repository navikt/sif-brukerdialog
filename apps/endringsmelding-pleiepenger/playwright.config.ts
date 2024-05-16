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
            slowMo: 200,
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
            API_TOKENX_AUDIENCE: 'dev-gcp:dusseldorf:k9-brukerdialog-api',
            API_URL_INNSYN: 'http://localhost:8099',
            API_URL_K9_SAK_INNSYN: 'http://localhost:8099',
            API_URL: 'http://localhost:8099',
            APP_VERSION: 'dev',
            APPSTATUS_DATASET: 'staging',
            APPSTATUS_PROJECT_ID: 'ryujtq87',
            DEBUG: 'false',
            DEKORATOR_URL: 'https://www.nav.no/dekoratoren/?simple=true&chatbot=false',
            DOMAIN_URL: 'http://localhost:8080',
            FRONTEND_API_PATH: 'http://localhost:8099/',
            FRONTEND_INNSYN_API_PATH: 'http://localhost:8099/api',
            FRONTEND_K9_SAK_INNSYN_API_PATH: 'http://localhost:8099/api',
            FRONTEND_VEDLEGG_URL: 'http://localhost:8099/api',
            GITHUB_REF_NAME: 'some_branch_name',
            INNSYN_URL: 'http://localhost:8080',
            LOGIN_URL: 'http://localhost:8099/login?redirect_location=http://localhost:8099',
            MINSIDE_URL: 'http://www.nav.no/minside',
            MSW: 'on',
            NODE_ENV: 'development',
            NOW: '2023-01-01',
            PUBLIC_PATH: '/familie/sykdom-i-familien/soknad/endringsmelding-pleiepenger',
            TILLAT_SN: 'false',
        },
    },
});
