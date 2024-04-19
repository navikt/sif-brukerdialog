require('dotenv').config();

const getAppSettings = (isCypress) => ({
    API_URL_INNSYN: `${process.env.API_URL_INNSYN}`,
    API_URL: `${process.env.API_URL}`,
    APP_VERSION: `${process.env.APP_VERSION}`,
    APPSTATUS_DATASET: `${process.env.APPSTATUS_DATASET}`,
    APPSTATUS_PROJECT_ID: `${process.env.APPSTATUS_PROJECT_ID}`,
    DEKORATOR_URL: `${process.env.DEKORATOR_URL}`,
    DOMAIN_URL: `${process.env.DOMAIN_URL}`,
    FRONTEND_API_PATH: `${process.env.FRONTEND_API_PATH}`,
    FRONTEND_INNSYN_API_PATH: `${process.env.FRONTEND_INNSYN_API_PATH}`,
    GITHUB_REF_NAME: `${process.env.GITHUB_REF_NAME}`,
    IMAGE: `${process.env.IMAGE}`,
    IMAGE: `${process.env.IMAGE}`,
    INNSYN_URL: `${process.env.INNSYN_URL}`,
    LOGIN_URL: `${process.env.LOGIN_URL}`,
    MINSIDE_URL: `${process.env.MINSIDE_URL}`,
    MSW: `${process.env.MSW}`,
    PUBLIC_PATH: `${process.env.PUBLIC_PATH}`,
    CYPRESS_ENV: isCypress ? 'true' : false,
});

module.exports = getAppSettings;
