const process = require('process');
require('dotenv').config();

const envSettings = () => {
    const appSettings = `
    window.appSettings = {
        API_URL: '${process.env.API_URL}',
        APP_VERSION: '${process.env.APP_VERSION}',
        VEDLEGG_API_URL: '${process.env.VEDLEGG_API_URL}',
        API_URL_INNSYN: '${process.env.API_URL_INNSYN}',
        FRONTEND_INNSYN_API_PATH: '${process.env.FRONTEND_INNSYN_API_PATH}',
        FRONTEND_API_PATH: '${process.env.FRONTEND_API_PATH}',
        FRONTEND_VEDLEGG_URL: '${process.env.FRONTEND_VEDLEGG_URL}',
        LOGIN_URL: '${process.env.LOGIN_URL}',
        PUBLIC_PATH: '${process.env.PUBLIC_PATH}',
        UTILGJENGELIG: '${process.env.UTILGJENGELIG}',
        NYNORSK: '${process.env.NYNORSK}',
        INNSYN: '${process.env.INNSYN}',
        APPSTATUS_PROJECT_ID: '${process.env.APPSTATUS_PROJECT_ID}',
        APPSTATUS_DATASET: '${process.env.APPSTATUS_DATASET}',
        USE_AMPLITUDE: '${process.env.USE_AMPLITUDE}',
        INNSYN_URL: '${process.env.INNSYN_URL}',
        FORENKLET_ARBEID: '${process.env.FORENKLET_ARBEID}',
        IMAGE: '${process.env.IMAGE}',
        GITHUB_REF_NAME: '${process.env.GITHUB_REF_NAME}',
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
