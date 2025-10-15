import { AppEnv } from '../env.schema';

export const getDevAppSettings = (): AppEnv => ({
    ENV: 'development',
    APP_VERSION: 'dev',
    GITHUB_REF_NAME: 'dev',
    PUBLIC_PATH: '/ungdomsprogrammet/ytelsen',

    VELG_SCENARIO: 'on',

    SIF_PUBLIC_AMPLITUDE_API_KEY: 'default',
    SIF_PUBLIC_APPSTATUS_DATASET: 'staging',
    SIF_PUBLIC_APPSTATUS_PROJECT_ID: 'ryujtq87',
    SIF_PUBLIC_DEKORATOR_URL: 'https://dekoratoren.ekstern.dev.nav.no/?simple=true&chatbot=false&urlLookupTable=false',
    SIF_PUBLIC_LOGIN_URL: '#',
    SIF_PUBLIC_MINSIDE_URL: '#',
    SIF_PUBLIC_USE_AMPLITUDE: 'true',
    SIF_PUBLIC_USE_FARO: 'true',
    SIF_PUBLIC_NAIS_FRONTEND_TELEMETRY_COLLECTOR_URL: '#',
    SIF_PUBLIC_URL_DOKUMENTARKIV: '#',
    SIF_PUBLIC_URL_RETT_OG_PLIKT: '#',
    SIF_PUBLIC_URL_PERSONOPPLYSNINGER: '#',
    SIF_PUBLIC_URL_PERSONVERN: '#',
    SIF_PUBLIC_URL_OM_UNGDOMSPROGRAMYTELSEN: '#',
    SIF_PUBLIC_URL_SKATTEETATEN: '#',
    SIF_PUBLIC_URL_ENDRE_KONTONUMMER: '#',
    SIF_PUBLIC_URL_SKRIV_TIL_OSS: '#',

    K9_BRUKERDIALOG_PROSESSERING_API_URL: '#',
    K9_BRUKERDIALOG_PROSESSERING_API_SCOPE: 'dev-gcp:dusseldorf:k9-brukerdialog-prosessering',
    K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH: '/api/brukerdialog',

    UNG_DELTAKELSE_OPPLYSER_API_URL: '#',
    UNG_DELTAKELSE_OPPLYSER_API_SCOPE: 'dev-gcp:k9saksbehandling:ung-deltakelse-opplyser',
    UNG_DELTAKELSE_OPPLYSER_FRONTEND_PATH: '/api/ung-deltakelse-opplyser',
});
