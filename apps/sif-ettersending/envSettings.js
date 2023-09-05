const process = require('process');
require('dotenv').config();

const envSettings = () => {
    const appSettings = `
     window.appSettings = {
        DEKORATOR_URL: '${process.env.DEKORATOR_URL}',
        API_URL: '${process.env.API_URL}',
        VEDLEGG_API_URL: '${process.env.VEDLEGG_API_URL}',
        FRONTEND_API_PATH: '${process.env.FRONTEND_API_PATH}',
        FRONTEND_VEDLEGG_URL: '${process.env.FRONTEND_VEDLEGG_URL}',
        PUBLIC_PATH: '${process.env.PUBLIC_PATH}',
        LOGIN_URL: '${process.env.LOGIN_URL}',
        NYNORSK: '${process.env.NYNORSK}',
        INNSYN_PP: '${process.env.INNSYN_PP}',
        DITT_NAV_URL: '${process.env.DITT_NAV_URL}',
        MIN_SIDE_URL: '${process.env.MIN_SIDE_URL}',
        APPSTATUS_PROJECT_ID: '${process.env.APPSTATUS_PROJECT_ID}',
        APPSTATUS_DATASET: '${process.env.APPSTATUS_DATASET}',
        USE_AMPLITUDE: '${process.env.USE_AMPLITUDE}',
        LIVETS_SLUTTFASE: '${process.env.LIVETS_SLUTTFASE}',
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

/** trigger */
