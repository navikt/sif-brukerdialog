export const getDevAppSettings = () => ({
    ENV: 'dev',
    APP_VERSION: 'dev',
    GITHUB_REF_NAME: 'branch-name',
    IMAGE: 'unknown',
    PUBLIC_PATH: '/familie/sykdom-i-familien/soknad/opplaringspenger',

    SIF_PUBLIC_FEATURE_TOGGLE_FRAVAR_FRA_ARBEID: 'on',

    SIF_PUBLIC_ANALYTICS_API_KEY: 'default',
    SIF_PUBLIC_APPSTATUS_DATASET: 'staging',
    SIF_PUBLIC_APPSTATUS_PROJECT_ID: 'ryujtq87',
    SIF_PUBLIC_DEKORATOR_URL:
        'https://www.nav.no/dekoratoren/?simple=true&chatbot=false&logoutUrl=https://www.nav.no/familie/sykdom-i-familien/soknad/opplaringspenger/oauth2/logout',
    SIF_PUBLIC_LOGIN_URL:
        'http://localhost:8081/auth-mock/cookie?subject=mockSubject&redirect_location=http://localhost:8080',
    SIF_PUBLIC_MINSIDE_URL: 'https://www.nav.no/minside',
    SIF_PUBLIC_SKIP_ORGNUM_VALIDATION: 'true',
    SIF_PUBLIC_USE_ANALYTICS: 'true',
    SIF_PUBLIC_FEATURE_NYNORSK: 'on',

    K9_BRUKERDIALOG_PROSESSERING_API_URL: '#',
    K9_BRUKERDIALOG_PROSESSERING_API_SCOPE: 'dev-gcp:dusseldorf:k9-brukerdialog-prosessering',
    K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH:
        '/familie/sykdom-i-familien/soknad/opplaringspenger/api/k9-brukerdialog',

    K9_SAK_INNSYN_FRONTEND_PATH: '/familie/sykdom-i-familien/soknad/opplaringspenger/api/k9-sak-innsyn',
    K9_SAK_INNSYN_API_SCOPE: 'dev-gcp:dusseldorf:k9-sak-innsyn-api',
    K9_SAK_INNSYN_API_URL: '#',
});
