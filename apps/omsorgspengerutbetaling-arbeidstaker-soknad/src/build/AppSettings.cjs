require('dotenv').config();
const process = require('process');

const getAppSettings = () => ({
    API_URL: `${process.env.API_URL}`,
    APP_VERSION: `${process.env.APP_VERSION}`,
    APPSTATUS_PROJECT_ID: `${process.env.APPSTATUS_PROJECT_ID}`,
    APPSTATUS_DATASET: `${process.env.APPSTATUS_DATASET}`,
    FRONTEND_API_PATH: `${process.env.FRONTEND_API_PATH}`,
    FRONTEND_VEDLEGG_URL: `${process.env.FRONTEND_VEDLEGG_URL}`,
    GITHUB_REF_NAME: `${process.env.GITHUB_REF_NAME}`,
    IMAGE: `${process.env.IMAGE}`,
    LOGIN_URL: `${process.env.LOGIN_URL}`,
    PUBLIC_PATH: `${process.env.PUBLIC_PATH}`,
    MINSIDE_URL: `${process.env.MINSIDE_URL}`,
    VEDLEGG_API_URL: `${process.env.VEDLEGG_API_URL}`,
});

module.exports = getAppSettings;
