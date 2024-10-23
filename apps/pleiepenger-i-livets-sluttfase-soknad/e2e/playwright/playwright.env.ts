import { AppEnv } from '../../env.schema';

export const playwrightEnv: AppEnv = {
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