require('dotenv').config();

const getAppSettings = () => ({
    ENV: `${process.env.ENV}`,
    APP_VERSION: `${process.env.APP_VERSION}`,
    NODE_ENV: `${process.env.NODE_ENV}`,
    PUBLIC_PATH: `${process.env.PUBLIC_PATH}`,
    GITHUB_REF_NAME: `${process.env.GITHUB_REF_NAME}`,

    SIF_PUBLIC_AMPLITUDE_API_KEY: `${process.env.SIF_PUBLIC_AMPLITUDE_API_KEY}`,
    SIF_PUBLIC_APPSTATUS_DATASET: `${process.env.SIF_PUBLIC_APPSTATUS_DATASET}`,
    SIF_PUBLIC_APPSTATUS_PROJECT_ID: `${process.env.SIF_PUBLIC_APPSTATUS_PROJECT_ID}`,
    SIF_PUBLIC_DEKORATOR_URL: `${process.env.SIF_PUBLIC_DEKORATOR_URL}`,
    SIF_PUBLIC_ENDRINGSMELDING_PP: `${process.env.SIF_PUBLIC_ENDRINGSMELDING_PP}`,
    SIF_PUBLIC_INNSYN_PP: `${process.env.SIF_PUBLIC_INNSYN_PP}`,
    SIF_PUBLIC_LOGIN_URL: `${process.env.SIF_PUBLIC_LOGIN_URL}`,
    SIF_PUBLIC_MINSIDE_URL: `${process.env.SIF_PUBLIC_MINSIDE_URL}`,
    SIF_PUBLIC_USE_AMPLITUDE: `${process.env.SIF_PUBLIC_USE_AMPLITUDE}`,
    SIF_PUBLIC_AMPLITUDE_API_KEY: `${process.env.SIF_PUBLIC_AMPLITUDE_API_KEY}`,
    SIF_PUBLIC_PLEIEPENGER_SYKT_BARN_URL: `${process.env.SIF_PUBLIC_PLEIEPENGER_SYKT_BARN_URL}`,
    SIF_PUBLIC_FEATURE_NYNORSK: `${process.env.SIF_PUBLIC_FEATURE_NYNORSK}`,
    SIF_PUBLIC_FEATURE_OPPLARINGSPENGER: `${process.env.SIF_PUBLIC_FEATURE_OPPLARINGSPENGER}`,

    K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH: `${process.env.K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH}`,
    K9_BRUKERDIALOG_PROSESSERING_API_SCOPE: `${process.env.K9_BRUKERDIALOG_PROSESSERING_API_SCOPE}`,
    K9_BRUKERDIALOG_PROSESSERING_API_URL: `${process.env.K9_BRUKERDIALOG_PROSESSERING_API_URL}`,
});

module.exports = getAppSettings;
