require('dotenv').config();

const getAppSettings = () => ({
    API_URL: `${process.env.API_URL}`,
    APP_VERSION: `${process.env.APP_VERSION}`,
    APPSTATUS_DATASET: `${process.env.APPSTATUS_DATASET}`,
    APPSTATUS_PROJECT_ID: `${process.env.APPSTATUS_PROJECT_ID}`,
    FRONTEND_API_PATH: `${process.env.FRONTEND_API_PATH}`,
    FRONTEND_VEDLEGG_URL: `${process.env.FRONTEND_VEDLEGG_URL}`,
    GITHUB_REF_NAME: `${process.env.GITHUB_REF_NAME}`,
    IMAGE: `${process.env.IMAGE}`,
    LOGIN_URL: `${process.env.LOGIN_URL}`,
    MINSIDE_URL: `${process.env.MINSIDE_URL}`,
    MOCK_DATE: `${process.env.MOCK_DATE}`,
    PUBLIC_PATH: `${process.env.PUBLIC_PATH}`,
    SKIP_ORGNUM_VALIDATION: `${process.env.SKIP_ORGNUM_VALIDATION}`,
    USE_MOCK_DATE: `${process.env.USE_MOCK_DATE}`,
    VEDLEGG_API_URL: `${process.env.VEDLEGG_API_URL}`,
});

module.exports = getAppSettings;
