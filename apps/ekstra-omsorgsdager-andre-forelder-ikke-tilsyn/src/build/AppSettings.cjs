require('dotenv').config();

const getAppSettings = () => ({
    API_URL: `${process.env.API_URL}`,
    APP_VERSION: `${process.env.APP_VERSION}`,
    APPSTATUS_DATASET: `${process.env.APPSTATUS_DATASET}`,
    APPSTATUS_PROJECT_ID: `${process.env.APPSTATUS_PROJECT_ID}`,
    FRONTEND_API_PATH: `${process.env.FRONTEND_API_PATH}`,
    GITHUB_REF_NAME: `${process.env.GITHUB_REF_NAME}`,
    IMAGE: `${process.env.IMAGE}`,
    LOGIN_URL: `${process.env.LOGIN_URL}`,
    MINSIDE_URL: `${process.env.MINSIDE_URL}`,
    PUBLIC_PATH: `${process.env.PUBLIC_PATH}`,
    USE_AMPLITUDE: `${process.env.USE_AMPLITUDE}`,
});

module.exports = getAppSettings;
