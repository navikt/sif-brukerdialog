import { AppEnv } from '../env.schema';

export const getDevAppSettings = (): AppEnv => ({
    ENV: 'development',
    APP_VERSION: 'dev',
    GITHUB_REF_NAME: 'dev',
    PUBLIC_PATH: '/familie/sykdom-i-familien/soknad/omsorgspenger',

    SIF_PUBLIC_ANALYTICS_API_KEY: 'default',
    SIF_PUBLIC_APPSTATUS_DATASET: 'staging',
    SIF_PUBLIC_APPSTATUS_PROJECT_ID: 'ryujtq87',
    SIF_PUBLIC_DEKORATOR_URL: 'https://dekoratoren.ekstern.dev.nav.no/?simple=true&chatbot=false&urlLookupTable=false',
    SIF_PUBLIC_LOGIN_URL: '#',
    SIF_PUBLIC_MINSIDE_URL: '#',
    SIF_PUBLIC_USE_ANALYTICS: 'true',
    SIF_PUBLIC_FEATURE_NYNORSK: 'on',

    K9_BRUKERDIALOG_PROSESSERING_API_URL: '#',
    K9_BRUKERDIALOG_PROSESSERING_API_SCOPE: 'dev-gcp:dusseldorf:k9-brukerdialog-prosessering',
    K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH: '/familie/sykdom-i-familien/soknad/omsorgspenger/api/k9-brukerdialog',

    K9_SAK_INNSYN_API_URL: '#',
    K9_SAK_INNSYN_API_SCOPE: 'dev-gcp:dusseldorf:k9-sak-innsyn-api',
    K9_SAK_INNSYN_FRONTEND_PATH: '/familie/sykdom-i-familien/soknad/omsorgspenger/api/k9-sak-innsyn',
});
