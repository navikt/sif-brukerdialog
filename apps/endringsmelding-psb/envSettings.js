const process = require('process');
require('dotenv').config();

const envSettings = () => {
    const appSettings = `
     window.appSettings = {
        API_URL: '${process.env.API_URL}',
        API_URL_INNSYN: '${process.env.API_URL_INNSYN}',
        PUBLIC_PATH: '${process.env.PUBLIC_PATH}',
        APP_VERSION: '${process.env.APP_VERSION}',
        LOGIN_URL: '${process.env.LOGIN_URL}',
        VELG_SAK: '${process.env.VELG_SAK}',
        APPSTATUS_PROJECT_ID: '${process.env.APPSTATUS_PROJECT_ID}',
        APPSTATUS_DATASET: '${process.env.APPSTATUS_DATASET}',
        USE_AMPLITUDE: '${process.env.USE_AMPLITUDE}',
        INNSYN_URL: '${process.env.INNSYN_URL}',
        MELLOMLAGRING: '${process.env.MELLOMLAGRING}',
        MSW_MODE: '${process.env.MSW_MODE}',
    };`
        .trim()
        .replace(/ /g, '');

    try {
        return appSettings;
    } catch (e) {
        console.error(e);
    }
};

module.exports = envSettings;
