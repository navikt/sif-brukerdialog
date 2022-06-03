const process = require('process');
require('dotenv').config();

const envSettings = () => {
    const API_URL = process.env.API_URL;
    const FRONTEND_API_PATH = process.env.FRONTEND_API_PATH;
    const PUBLIC_PATH = process.env.PUBLIC_PATH;
    const LOGIN_URL = process.env.LOGIN_URL;
    const NYNORSK = process.env.NYNORSK;
    const INNSYN_PP = process.env.INNSYN_PP;
    const DITT_NAV_URL = process.env.DITT_NAV_URL;
    const APPSTATUS_PROJECT_ID = process.env.APPSTATUS_PROJECT_ID;
    const APPSTATUS_DATASET = process.env.APPSTATUS_DATASET;
    const USE_AMPLITUDE = process.env.USE_AMPLITUDE;
    const LIVETS_SLUTTFASE = process.env.LIVETS_SLUTTFASE;

    const appSettings = `
     window.appSettings = {
         API_URL: '${API_URL}',
         FRONTEND_API_PATH: '${FRONTEND_API_PATH}',
         PUBLIC_PATH: '${PUBLIC_PATH}',
         LOGIN_URL: '${LOGIN_URL}',
         NYNORSK: '${NYNORSK}',
         INNSYN_PP: '${INNSYN_PP}',
         DITT_NAV_URL: '${DITT_NAV_URL}',
         APPSTATUS_PROJECT_ID: '${APPSTATUS_PROJECT_ID}',
         APPSTATUS_DATASET: '${APPSTATUS_DATASET}',
         USE_AMPLITUDE: '${USE_AMPLITUDE}',
         LIVETS_SLUTTFASE: '${LIVETS_SLUTTFASE}',
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
