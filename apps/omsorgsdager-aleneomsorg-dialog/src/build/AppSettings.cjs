require('dotenv').config();

const getAppSettings = () => ({
    APP_VERSION: `${process.env.APP_VERSION}`,
    APPSTATUS_DATASET: `${process.env.APPSTATUS_DATASET}`,
    APPSTATUS_PROJECT_ID: `${process.env.APPSTATUS_PROJECT_ID}`,
    GITHUB_REF_NAME: `${process.env.GITHUB_REF_NAME}`,
    IMAGE: `${process.env.IMAGE}`,
    K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH: `${process.env.K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH}`,
    LOGIN_URL: `${process.env.LOGIN_URL}`,
    MINSIDE_URL: `${process.env.MINSIDE_URL}`,
    NAIS_FRONTEND_TELEMETRY_COLLECTOR_URL: `${process.env.NAIS_FRONTEND_TELEMETRY_COLLECTOR_URL}`,
    OMS_IKKE_TILSYN_URL: `${process.env.OMS_IKKE_TILSYN_URL}`,
    PUBLIC_PATH: `${process.env.PUBLIC_PATH}`,
    USE_FARO: `${process.env.USE_FARO}`,
});

module.exports = getAppSettings;
