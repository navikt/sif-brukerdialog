const process = require('process');
require('dotenv').config();

const envSettings = (MSW) => {
    const appSettings = `
     window.appSettings = {
        API_URL_INNSYN: '${process.env.API_URL_INNSYN}',
        FRONTEND_INNSYN_API_PATH: '${process.env.FRONTEND_INNSYN_API_PATH}',
        API_URL: '${process.env.API_URL}',
        FRONTEND_API_PATH: '${process.env.FRONTEND_API_PATH}',
        APP_VERSION: '${process.env.APP_VERSION}',
        APPSTATUS_DATASET: '${process.env.APPSTATUS_DATASET}',
        APPSTATUS_PROJECT_ID: '${process.env.APPSTATUS_PROJECT_ID}',
        INNSYN_URL: '${process.env.INNSYN_URL}',
        INGRESS: '${process.env.INGRESS}',
        LOGIN_URL: '${process.env.LOGIN_URL}',
        MELLOMLAGRING: '${process.env.MELLOMLAGRING}',
        MSW: '${MSW || process.env.MSW}',
        PUBLIC_PATH: '${process.env.PUBLIC_PATH}',
        USE_AMPLITUDE: '${process.env.USE_AMPLITUDE}',
        VELG_SAK: '${process.env.VELG_SAK}',
        GITHUB_SHA: '${process.env.GITHUB_SHA}'
    };`
        .trim()
        .replace(/ /g, '');

    try {
        return appSettings;
    } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
    }
};

module.exports = envSettings;
