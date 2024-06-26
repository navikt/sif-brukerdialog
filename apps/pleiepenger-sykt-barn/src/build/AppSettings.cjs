require('dotenv').config();

const getAppSettings = () => ({
    API_URL_INNSYN: `${process.env.API_URL_INNSYN}`,
    API_URL: `${process.env.API_URL}`,
    APP_VERSION: `${process.env.APP_VERSION}`,
    APPSTATUS_DATASET: `${process.env.APPSTATUS_DATASET}`,
    APPSTATUS_PROJECT_ID: `${process.env.APPSTATUS_PROJECT_ID}`,
    FRONTEND_API_PATH: `${process.env.FRONTEND_API_PATH}`,
    FRONTEND_INNSYN_API_PATH: `${process.env.FRONTEND_INNSYN_API_PATH}`,
    FRONTEND_VEDLEGG_URL: `${process.env.FRONTEND_VEDLEGG_URL}`,
    GITHUB_REF_NAME: `${process.env.GITHUB_REF_NAME}`,
    IMAGE: `${process.env.IMAGE}`,
    INNSYN_URL: `${process.env.INNSYN_URL}`,
    LOGIN_URL: `${process.env.LOGIN_URL}`,
    MIN_SIDE_URL: `${process.env.MIN_SIDE_URL}`,
    MOCK_DATE: `${process.env.MOCK_DATE}`,
    USE_MOCK_DATE: `${process.env.USE_MOCK_DATE}`,
    PUBLIC_PATH: `${process.env.PUBLIC_PATH}`,
    VEDLEGG_API_URL: `${process.env.VEDLEGG_API_URL}`,
    USE_AMPLITUDE: `${process.env.USE_AMPLITUDE}`,
});

module.exports = getAppSettings;
