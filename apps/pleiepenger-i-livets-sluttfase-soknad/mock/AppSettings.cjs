require('dotenv').config();

const getAppSettings = () => ({
    ENV: `${process.env.ENV}`,
    APP_VERSION: `${process.env.APP_VERSION}`,
    PUBLIC_PATH: `${process.env.PUBLIC_PATH}`,
    GITHUB_REF_NAME: `${process.env.GITHUB_REF_NAME}`,

    SIF_PUBLIC_APPSTATUS_DATASET: `${process.env.SIF_PUBLIC_APPSTATUS_DATASET}`,
    SIF_PUBLIC_APPSTATUS_PROJECT_ID: `${process.env.SIF_PUBLIC_APPSTATUS_PROJECT_ID}`,
    SIF_PUBLIC_USE_AMPLITUDE: `${process.env.SIF_PUBLIC_USE_AMPLITUDE}`,
    SIF_PUBLIC_DEKORATOR_URL: `${process.env.SIF_PUBLIC_DEKORATOR_URL}`,
    SIF_PUBLIC_LOGIN_URL: `${process.env.SIF_PUBLIC_LOGIN_URL}`,
    SIF_PUBLIC_MINSIDE_URL: `${process.env.SIF_PUBLIC_MINSIDE_URL}`,

    K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH: `${process.env.K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH}`,
    K9_BRUKERDIALOG_PROSESSERING_API_SCOPE: `${process.env.K9_BRUKERDIALOG_PROSESSERING_API_SCOPE}`,
    K9_BRUKERDIALOG_PROSESSERING_API_URL: `${process.env.K9_BRUKERDIALOG_PROSESSERING_API_URL}`,
});

module.exports = getAppSettings;
