// Static dev app settings (replaces .env usage for dev & playwright)
export const getDevAppSettings = () => ({
    ENV: 'dev',
    APP_VERSION: 'dev',
    NODE_ENV: 'development',
    GITHUB_REF_NAME: 'branch-name',
    PUBLIC_PATH: '/familie/sykdom-i-familien/soknad/omsorgspengerutbetaling',

    K9_BRUKERDIALOG_PROSESSERING_API_URL: '#',
    K9_BRUKERDIALOG_PROSESSERING_API_SCOPE: 'dev-gcp:dusseldorf:k9-brukerdialog-prosessering',
    K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH: '/familie/sykdom-i-familien/soknad/omsorgspengerutbetaling/api',

    SIF_PUBLIC_FEATURE_NYNORSK: 'on',
    SIF_PUBLIC_APPSTATUS_DATASET: 'staging',
    SIF_PUBLIC_APPSTATUS_PROJECT_ID: 'ryujtq87',
    SIF_PUBLIC_DEKORATOR_URL:
        'https://www.nav.no/dekoratoren/?simple=true&chatbot=false&logoutUrl=https://www.nav.no/familie/sykdom-i-familien/soknad/omsorgspengerutbetaling/oauth2/logout',
    SIF_PUBLIC_LOGIN_URL:
        'http://localhost:8081/auth-mock/cookie?subject=mockSubject&redirect_location=http://localhost:8080',
    SIF_PUBLIC_MINSIDE_URL: 'https://www.intern.dev.nav.no/minside',
    SIF_PUBLIC_USE_ANALYTICS: 'false',
    SIF_PUBLIC_ANALYTICS_API_KEY: '123',

    MOCK_DATE: '2024-08-01',
    USE_MOCK_DATE: 'true',
});
