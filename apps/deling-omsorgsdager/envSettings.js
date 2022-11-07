const process = require('process');
require('dotenv').config();

const envSettings = () => {
    const appSettings = `
     window.appSettings = {
         API_URL: '${process.env.API_URL}',
         FRONTEND_API_PATH: '${process.env.FRONTEND_API_PATH}',
         FRONTEND_VEDLEGG_URL:' ${process.env.FRONTEND_VEDLEGG_URL}',
         PUBLIC_PATH: '${process.env.PUBLIC_PATH}',
         APP_VERSION: '${process.env.APP_VERSION}',
         LOGIN_URL: '${process.env.LOGIN_URL}',
         APPSTATUS_PROJECT_ID: '${process.env.APPSTATUS_PROJECT_ID}',
         APPSTATUS_DATASET: '${process.env.APPSTATUS_DATASET}',
         USE_AMPLITUDE: '${process.env.USE_AMPLITUDE}',
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
