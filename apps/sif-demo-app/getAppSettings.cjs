require('dotenv').config();

const process = require('process');

const getAppSettings = () => ({
    APP_VERSION: `${process.env.APP_VERSION}`,
    GITHUB_REF_NAME: `${process.env.GITHUB_REF_NAME}`,
    IMAGE: `${process.env.IMAGE}`,
    PUBLIC_PATH: `${process.env.PUBLIC_PATH}`,

    K9_BRUKERDIALOG_PROSESSERING_API_URL: `${process.env.K9_BRUKERDIALOG_PROSESSERING_API_URL}`,
    K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH: `${process.env.K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH}`,
});

module.exports = getAppSettings;
