require('dotenv').config();

const getAppSettings = () => ({
    API_URL: `${process.env.API_URL}`,
    APP_VERSION: `${process.env.APP_VERSION}`,
    APPSTATUS_DATASET: `${process.env.APPSTATUS_DATASET}`,
    APPSTATUS_PROJECT_ID: `${process.env.APPSTATUS_PROJECT_ID}`,
    DEKORATOR_URL: `${process.env.DEKORATOR_URL}`,
    DITT_NAV_URL: `${process.env.DITT_NAV_URL}`,
    FRONTEND_API_PATH: `${process.env.FRONTEND_API_PATH}`,
    FRONTEND_VEDLEGG_URL: `${process.env.FRONTEND_VEDLEGG_URL}`,
    GITHUB_REF_NAME: `${process.env.GITHUB_REF_NAME}`,
    IMAGE: `${process.env.IMAGE}`,
    INNSYN_PP: `${process.env.INNSYN_PP}`,
    LIVETS_SLUTTFASE: `${process.env.LIVETS_SLUTTFASE}`,
    LOGIN_URL: `${process.env.LOGIN_URL}`,
    MIN_SIDE_URL: `${process.env.MIN_SIDE_URL}`,
    NYNORSK: `${process.env.NYNORSK}`,
    PUBLIC_PATH: `${process.env.PUBLIC_PATH}`,
    USE_AMPLITUDE: `${process.env.USE_AMPLITUDE}`,
    VEDLEGG_API_URL: `${process.env.VEDLEGG_API_URL}`,
});

module.exports = { getAppSettings };
