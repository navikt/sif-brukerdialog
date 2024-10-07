require('dotenv').config();

const getAppSettings = (isTest) => {
    return {
        APP_VERSION: `${process.env.APP_VERSION}`,
        NODE_ENV: `${process.env.NODE_ENV}`,
        PUBLIC_PATH: `${process.env.PUBLIC_PATH}`,
        GITHUB_REF_NAME: `${process.env.GITHUB_REF_NAME}`,

        SIF_PUBLIC_APPSTATUS_DATASET: `${process.env.SIF_PUBLIC_APPSTATUS_DATASET}`,
        SIF_PUBLIC_APPSTATUS_PROJECT_ID: `${process.env.SIF_PUBLIC_APPSTATUS_PROJECT_ID}`,
        SIF_PUBLIC_DEKORATOR_URL: `${process.env.SIF_PUBLIC_DEKORATOR_URL}`,
        SIF_PUBLIC_LOGIN_URL: `${process.env.SIF_PUBLIC_LOGIN_URL}`,
        SIF_PUBLIC_MINSIDE_URL: `${process.env.SIF_PUBLIC_MINSIDE_URL}`,
        SIF_PUBLIC_FEATURE_NYNORSK: `${process.env.SIF_PUBLIC_FEATURE_NYNORSK}`,
        SIF_PUBLIC_INNSYN_URL: `${process.env.INNSYN_URL}`,

        K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH: `${process.env.K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH}`,
        K9_BRUKERDIALOG_PROSESSERING_API_URL: `${process.env.K9_BRUKERDIALOG_PROSESSERING_API_URL}`,
        SIF_INNSYN_FRONTEND_PATH: `${process.env.SIF_INNSYN_FRONTEND_PATH}`,
        SIF_INNSYN_API_URL: `${process.env.SIF_INNSYN_API_URL}`,

        DOMAIN_URL: `${process.env.DOMAIN_URL}`,
        MSW: isTest ? 'off' : `${process.env.MSW}`,
        E2E_TEST: isTest ? 'true' : false,
        SIF_PUBLIC_FEATURE_VELG_SCENARIO: isTest ? 'on' : `${process.env.SIF_PUBLIC_FEATURE_VELG_SCENARIO}`,
        NOW: `${process.env.NOW}`,
    };
};

module.exports = getAppSettings;
