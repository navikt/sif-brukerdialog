require('dotenv').config();

const getAppSettings = () => ({
    PUBLIC_PATH: `${process.env.PUBLIC_PATH}`,
    APP_VERSION: `${process.env.APP_VERSION}`,
    GITHUB_REF_NAME: `${process.env.GITHUB_REF_NAME}`,
    IMAGE: `${process.env.IMAGE}`,

    SIF_PUBLIC_APPSTATUS_DATASET: `${process.env.SIF_PUBLIC_APPSTATUS_DATASET}`,
    SIF_PUBLIC_APPSTATUS_PROJECT_ID: `${process.env.SIF_PUBLIC_APPSTATUS_PROJECT_ID}`,
    SIF_PUBLIC_INNSYN_URL: `${process.env.SIF_PUBLIC_INNSYN_URL}`,
    SIF_PUBLIC_LOGIN_URL: `${process.env.SIF_PUBLIC_LOGIN_URL}`,
    SIF_PUBLIC_MINSIDE_URL: `${process.env.SIF_PUBLIC_MINSIDE_URL}`,
    SIF_PUBLIC_USE_AMPLITUDE: `${process.env.SIF_PUBLIC_USE_AMPLITUDE}`,

    MOCK_DATE: `${process.env.MOCK_DATE}`,
    USE_MOCK_DATE: `${process.env.USE_MOCK_DATE}`,

    MINSIDE_URL: `${process.env.MINSIDE_URL}`,
});

module.exports = getAppSettings;
