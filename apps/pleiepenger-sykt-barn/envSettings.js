const process = require('process');
require('dotenv').config();

const envSettings = () => {
    const API_URL = process.env.API_URL;
    const VEDLEGG_API_URL = process.env.VEDLEGG_API_URL;
    const API_URL_INNSYN = process.env.API_URL_INNSYN;
    const FRONTEND_INNSYN_API_PATH = process.env.FRONTEND_INNSYN_API_PATH;
    const FRONTEND_API_PATH = process.env.FRONTEND_API_PATH;
    const FRONTEND_VEDLEGG_URL = process.env.FRONTEND_VEDLEGG_URL;
    const LOGIN_URL = process.env.LOGIN_URL;
    const PUBLIC_PATH = process.env.PUBLIC_PATH;
    const UTILGJENGELIG = process.env.UTILGJENGELIG;
    const NYNORSK = process.env.NYNORSK;
    const INNSYN = process.env.INNSYN;
    const APPSTATUS_PROJECT_ID = process.env.APPSTATUS_PROJECT_ID;
    const APPSTATUS_DATASET = process.env.APPSTATUS_DATASET;
    const USE_AMPLITUDE = process.env.USE_AMPLITUDE;
    const APP_VERSION = process.env.APP_VERSION;
    const INNSYN_URL = process.env.INNSYN_URL;
    const FORENKLET_ARBEID = process.env.FORENKLET_ARBEID;
    const PREUTFYLLING = process.env.PREUTFYLLING;

    const appSettings = `
    window.appSettings = {
        API_URL: '${API_URL}',
        VEDLEGG_API_URL: '${VEDLEGG_API_URL}',
        API_URL_INNSYN: '${API_URL_INNSYN}',
        FRONTEND_INNSYN_API_PATH: '${FRONTEND_INNSYN_API_PATH}',
        FRONTEND_API_PATH: '${FRONTEND_API_PATH}',
        FRONTEND_VEDLEGG_URL:'${FRONTEND_VEDLEGG_URL}',
        LOGIN_URL: '${LOGIN_URL}',
        PUBLIC_PATH: '${PUBLIC_PATH}',
        UTILGJENGELIG: '${UTILGJENGELIG}',
        NYNORSK: '${NYNORSK}',
        INNSYN: '${INNSYN}',
        APPSTATUS_PROJECT_ID: '${APPSTATUS_PROJECT_ID}',
        APPSTATUS_DATASET: '${APPSTATUS_DATASET}',
        USE_AMPLITUDE: '${USE_AMPLITUDE}',
        APP_VERSION: '${APP_VERSION}',
        INNSYN_URL: '${INNSYN_URL}',
        FORENKLET_ARBEID: '${FORENKLET_ARBEID}',
        PREUTFYLLING: '${PREUTFYLLING}',
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
