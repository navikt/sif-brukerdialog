import { AppEnv } from '../env.schema';

export const getDevAppSettings = (): AppEnv => ({
    ENV: 'development',
    APP_VERSION: 'dev',
    GITHUB_REF_NAME: 'dev',
    PUBLIC_PATH: '/familie/sykdom-i-familien/soknad/omsorgsdager-aleneomsorg',
    SIF_PUBLIC_APPSTATUS_DATASET: 'off',
    SIF_PUBLIC_APPSTATUS_PROJECT_ID: 'ryujtq87',
    SIF_PUBLIC_DEKORATOR_URL: 'https://dekoratoren.ekstern.dev.nav.no/?simple=true&chatbot=false',
    SIF_PUBLIC_LOGIN_URL: '#',
    SIF_PUBLIC_MINSIDE_URL: '#',
    SIF_PUBLIC_USE_ANALYTICS: 'false',
    SIF_PUBLIC_FEATURE_NYNORSK: 'on',
    SIF_PUBLIC_OMS_IKKE_TILSYN_URL: 'https://ekstra-omsorgsdager-andre-forelder-ikke-tilsyn.intern.dev.nav.no/',
    K9_BRUKERDIALOG_PROSESSERING_API_URL: '#',
    K9_BRUKERDIALOG_PROSESSERING_API_SCOPE: 'dev-gcp:dusseldorf:k9-brukerdialog-prosessering',
    K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH:
        '/familie/sykdom-i-familien/soknad/omsorgsdager-aleneomsorg/api/k9-brukerdialog',
});
