require('dotenv').config();

const getAppSettings = () => ({
    API_URL: `${process.env.API_URL}`,
    K9_SAK_INNSYN_API_URL: `${process.env.K9_SAK_INNSYN_API_URL}`,
    K9_SAK_INNSYN_API_PATH: `${process.env.K9_SAK_INNSYN_API_PATH}`,
    APP_VERSION: `${process.env.APP_VERSION}`,
    APPSTATUS_DATASET: `${process.env.APPSTATUS_DATASET}`,
    APPSTATUS_PROJECT_ID: `${process.env.APPSTATUS_PROJECT_ID}`,
    FEATURE_NYNORSK: `${process.env.FEATURE_NYNORSK}`,
    FRONTEND_API_PATH: `${process.env.FRONTEND_API_PATH}`,
    FRONTEND_VEDLEGG_URL: `${process.env.FRONTEND_VEDLEGG_URL}`,
    GITHUB_REF_NAME: `${process.env.GITHUB_REF_NAME}`,
    IMAGE: `${process.env.IMAGE}`,
    LOGIN_URL: `${process.env.LOGIN_URL}`,
    MINSIDE_URL: `${process.env.MINSIDE_URL}`,
    PUBLIC_PATH: `${process.env.PUBLIC_PATH}`,
    VEDLEGG_API_URL: `${process.env.VEDLEGG_API_URL}`,
});

module.exports = getAppSettings;
