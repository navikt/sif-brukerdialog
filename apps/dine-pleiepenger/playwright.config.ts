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
            slowMo: 5,
        },
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
    webServer: {
        command: 'yarn dev',
        url: 'http://localhost:8080/innsyn',
        reuseExistingServer: true,
        env: {
            PUBLIC_PATH: '/innsyn',
            API_URL: 'http://localhost:8089',
            NEXT_PUBLIC_FEATURE_APPSTATUS: 'off',
            NEXT_PUBLIC_APPSTATUS_PROJECT_ID: 'ryujtq87',
            NEXT_PUBLIC_APPSTATUS_DATASET: 'staging',
            NEXT_PUBLIC_GITHUB_REF_NAME: 'dev-branch',
            NEXT_PUBLIC_BASE_PATH: '/innsyn',
            NEXT_PUBLIC_LOGIN_URL: '/dummy',
            NEXT_PUBLIC_RUNTIME_ENVIRONMENT: 'dev',
            NEXT_PUBLIC_API_URL_K9_SAK_INNSYN: 'http://k9-sak-innsyn-api',
            NEXT_PUBLIC_API_URL_INNSYN: 'http://sif-innsyn-api',
            NEXT_PUBLIC_API_URL_BRUKERDIALOG: 'http://k9-brukerdialog-api',
            NEXT_PUBLIC_K9_SAK_INNSYN_BACKEND_SCOPE: 'dev-gcp:dusseldorf:k9-sak-innsyn-api',
            NEXT_PUBLIC_INNSYN_BACKEND_SCOPE: 'dev-gcp:dusseldorf:sif-innsyn-api',
            NEXT_PUBLIC_BRUKERDIALOG_BACKEND_SCOPE: 'dev-gcp:dusseldorf:k9-brukerdialog-api',
            NPM_CONFIG_CACHE: '/tmp',
            NEXT_PUBLIC_DINE_UTBETALINGER: 'https://tjenester.nav.no/utbetalingsoversikt/',
            NEXT_PUBLIC_ENDRINGSDIALOG_URL: 'https://endringsmelding-pleiepenger.intern.dev.nav.no/',
            NEXT_PUBLIC_ENRINGER_DU_MA_GI_BESKJED_OM_INFO_URL: 'https://dev.nav.no/pleiepenger-barn#melde',
            NEXT_PUBLIC_ETTERSENDELSE_PLEIEPENGER_URL:
                'https://k9-ettersending-soknad.intern.dev.nav.no/familie/sykdom-i-familien/soknad/ettersending/pleiepenger',
            NEXT_PUBLIC_KLAGE_INFO_URL: 'https://www.nav.no/person/kontakt-oss/nb/tilbakemeldinger',
            NEXT_PUBLIC_MIN_SIDE_URL: 'https://www.dev.nav.no/minside',
            NEXT_PUBLIC_PLEIEPENGER_URL:
                'https://pleiepengesoknad.intern.dev.nav.no/familie/sykdom-i-familien/soknad/pleiepenger/soknad/',
            NEXT_PUBLIC_PLEIEPENGER_INFO_URL: 'https://www.dev.nav.no/pleiepenger-barn',
            NEXT_PUBLIC_REGELVERK_INFO_URL: 'https://lovdata.no/nav/folketrygdloven/kap9',
            NEXT_PUBLIC_SAKSBEHANDLINGSTID_INFO_URL:
                'https://www.intern.dev.nav.no/saksbehandlingstider#pleiepenger-for-sykt-barn',
            NEXT_PUBLIC_SAKSOVERSIKT: 'https://person.nav.no/mine-saker',
            NEXT_PUBLIC_SKRIV_TIL_OSS: 'https://www.nav.no/skriv-til-oss',
            NEXT_PUBLIC_SYKDOM_I_FAMILIEN_INFO_URL:
                'https://www.nav.no/familie/sykdom-i-familien/nb/pleiepenger-for-sykt-barn',
            NEXT_PUBLIC_ARBEIDSGIVER_PLEIEPENGER_URL: 'https://www.nav.no/arbeidsgiver/pleiepenger-barn',
            NEXT_PUBLIC_MINSIDE_DOKUMENTOVERSIKT_URL: 'https://person.dev.nav.no/mine-saker',
            NEXT_PUBLIC_UTBETALINGSOVERSIKT_URL: 'https://tjenester.nav.no/utbetalingsoversikt',
            NEXT_PUBLIC_FEATURE_HENT_SAKER: 'on',
            NEXT_PUBLIC_FEATURE_HENT_MELLOMLAGRING: 'off',
            NEXT_PUBLIC_TELEMETRY_URL: 'http://localhost:12347/collect',
        },
    },
});
