import { AppEnv } from '../../env.schema';

export const playwrightEnv: AppEnv = {
    ENV: 'dev',
    APP_VERSION: 'dev',

    PUBLIC_PATH: '/sif-brukerdialog/ungdomsytelse-deltaker/',
    GITHUB_REF_NAME: 'branch-name',
    SIF_PUBLIC_AMPLITUDE_API_KEY: 'default',
    SIF_PUBLIC_APPSTATUS_DATASET: 'staging',
    SIF_PUBLIC_APPSTATUS_PROJECT_ID: 'ryujtq87',
    SIF_PUBLIC_DEKORATOR_URL:
        'https://www.nav.no/dekoratoren/?simple=true&chatbot=false&logoutUrl=https://www.nav.no/familie/sykdom-i-familien/soknad/omsorgspenger/oauth2/logout',
    SIF_PUBLIC_LOGIN_URL:
        'http://localhost:8081/auth-mock/cookie?subject=mockSubject&redirect_location=http://localhost:8080',
    SIF_PUBLIC_MINSIDE_URL: 'https://www.nav.no/minside',
    SIF_PUBLIC_URL_DOKUMENTARKIV: 'https://www.nav.no/minside',
    SIF_PUBLIC_USE_AMPLITUDE: 'true',
    K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH: '/familie/sykdom-i-familien/soknad/omsorgspenger/api/k9-brukerdialog',
    K9_BRUKERDIALOG_PROSESSERING_API_SCOPE: 'dev-gcp:dusseldorf:k9-brukerdialog-prosessering',
    K9_BRUKERDIALOG_PROSESSERING_API_URL: 'http://k9-brukerdialog-prosessering',

    UNG_DELTAKELSE_OPPLYSER_FRONTEND_PATH: '/api/ung-deltakelse-opplyser',
    UNG_DELTAKELSE_OPPLYSER_API_SCOPE: 'scope',
    UNG_DELTAKELSE_OPPLYSER_API_URL: 'http://localhost:8089',
    SIF_PUBLIC_URL_RETT_OG_PLIKT: 'http://localhost/rett-og-plikt',
    SIF_PUBLIC_URL_PERSONOPPLYSNINGER: 'http://localhost/personopplysninger',
    SIF_PUBLIC_URL_PERSONVERN: 'http://localhost/personvern',
    SIF_PUBLIC_URL_OM_UNGDOMSPROGRAMYTELSEN: 'http://localhost/om-ungdomsprogramytelsen',
    SIF_PUBLIC_URL_SKATTEETATEN: 'https://www.skatteetaten.no/',
    SIF_PUBLIC_URL_ENDRE_KONTONUMMER: 'http://localhost/endre-kontonummer',
    SIF_PUBLIC_URL_SKRIV_TIL_OSS: 'http://localhost/skriv-til-oss',
    SIF_PUBLIC_PERSONALIA_URL: 'http://localhost/personalia',
    VELG_SCENARIO: 'off',
};
