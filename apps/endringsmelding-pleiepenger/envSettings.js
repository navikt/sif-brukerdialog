const process = require('process');
require('dotenv').config();

const envSettings = (MSW) => {
    const appSettings = `
     window.appSettings = {
        API_URL_INNSYN: '${process.env.API_URL_INNSYN}',
        API_URL: '${process.env.API_URL}',
        APP_VERSION: '${process.env.APP_VERSION}',
        APPSTATUS_DATASET: '${process.env.APPSTATUS_DATASET}',
        APPSTATUS_PROJECT_ID: '${process.env.APPSTATUS_PROJECT_ID}',
        DOMAIN_URL: '${process.env.DOMAIN_URL}',
        FRONTEND_API_PATH: '${process.env.FRONTEND_API_PATH}',
        FRONTEND_INNSYN_API_PATH: '${process.env.FRONTEND_INNSYN_API_PATH}',
        GITHUB_REF_NAME: '${process.env.GITHUB_REF_NAME}',
        IMAGE: '${process.env.IMAGE}',
        INNSYN_URL: '${process.env.INNSYN_URL}',
        LOGIN_URL: '${process.env.LOGIN_URL}',
        MELLOMLAGRING: '${process.env.MELLOMLAGRING}',
        MINSIDE_URL: '${process.env.MINSIDE_URL}',
        MSW: '${MSW || process.env.MSW}',
        PUBLIC_PATH: '${process.env.PUBLIC_PATH}',
        USE_AMPLITUDE: '${process.env.USE_AMPLITUDE}',
        IMAGE: '${process.env.IMAGE}',
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
