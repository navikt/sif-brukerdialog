require('dotenv').config();

const getAppSettings = () => ({
    ENV: `${process.env.ENV}`,
    APP_VERSION: `${process.env.APP_VERSION}`,
    PUBLIC_PATH: `${process.env.PUBLIC_PATH}`,
    GITHUB_REF_NAME: `${process.env.GITHUB_REF_NAME}`,
    NAIS_FRONTEND_TELEMETRY_COLLECTOR_URL: `${process.env.NAIS_FRONTEND_TELEMETRY_COLLECTOR_URL}`,

    SIF_PUBLIC_AMPLITUDE_API_KEY: `${process.env.SIF_PUBLIC_AMPLITUDE_API_KEY}`,
    SIF_PUBLIC_APPSTATUS_DATASET: `${process.env.SIF_PUBLIC_APPSTATUS_DATASET}`,
    SIF_PUBLIC_APPSTATUS_PROJECT_ID: `${process.env.SIF_PUBLIC_APPSTATUS_PROJECT_ID}`,
    SIF_PUBLIC_DEKORATOR_URL: `${process.env.SIF_PUBLIC_DEKORATOR_URL}`,
    SIF_PUBLIC_LOGIN_URL: `${process.env.SIF_PUBLIC_LOGIN_URL}`,
    SIF_PUBLIC_MINSIDE_URL: `${process.env.SIF_PUBLIC_MINSIDE_URL}`,
    SIF_PUBLIC_OMS_IKKE_TILSYN_URL: `${process.env.SIF_PUBLIC_OMS_IKKE_TILSYN_URL}`,
    SIF_PUBLIC_USE_AMPLITUDE: `${process.env.SIF_PUBLIC_USE_AMPLITUDE}`,
    SIF_PUBLIC_AMPLITUDE_API_KEY: `${process.env.SIF_PUBLIC_AMPLITUDE_API_KEY}`,
    SIF_PUBLIC_FEATURE_NYNORSK: `${process.env.SIF_PUBLIC_FEATURE_NYNORSK}`,
    SIF_PUBLIC_USE_FARO: `${process.env.SIF_PUBLIC_USE_FARO}`,

    K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH: `${process.env.K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH}`,
    K9_BRUKERDIALOG_PROSESSERING_API_SCOPE: `${process.env.K9_BRUKERDIALOG_PROSESSERING_API_SCOPE}`,
    K9_BRUKERDIALOG_PROSESSERING_API_URL: `${process.env.K9_BRUKERDIALOG_PROSESSERING_API_URL}`,
});

module.exports = getAppSettings;
