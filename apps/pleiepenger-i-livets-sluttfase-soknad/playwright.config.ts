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
        env: {
            APP_VERSION: 'dev',
            NODE_ENV: 'development',
            PUBLIC_PATH: '/familie/sykdom-i-familien/soknad/pleiepenger-i-livets-sluttfase',
            NPM_CONFIG_CACHE: '/tmp',

            K9_BRUKERDIALOG_PROSESSERING_API_URL: 'http://localhost:8089',
            K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH: '/api',

            SIF_PUBLIC_APPSTATUS_DATASET: 'staging',
            SIF_PUBLIC_APPSTATUS_PROJECT_ID: 'ryujtq87',
            SIF_PUBLIC_DEKORATOR_URL: 'https://dekoratoren.ekstern.dev.nav.no/?simple=true&chatbot=false',
            SIF_PUBLIC_MINSIDE_URL: 'https://www.intern.dev.nav.no/minside',
        },
    },
});
