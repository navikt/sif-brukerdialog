const process = require('process');
require('dotenv').config();

const envSettings = () => {
    const appSettings = `
     window.appSettings = {
         API_URL: '${process.env.API_URL}',
         APP_VERSION: '${process.env.APP_VERSION}',
         APPSTATUS_DATASET: '${process.env.APPSTATUS_DATASET}',
         APPSTATUS_PROJECT_ID: '${process.env.APPSTATUS_PROJECT_ID}',
         FRONTEND_API_PATH: '${process.env.FRONTEND_API_PATH}',
         GITHUB_REF_NAME: '${process.env.GITHUB_REF_NAME}',
         OMS_IKKE_TILSYN_URL: '${process.env.OMS_IKKE_TILSYN_URL}',
         IMAGE: '${process.env.IMAGE}',
         LOGIN_URL: '${process.env.LOGIN_URL}',
         MINSIDE_URL: '${process.env.MINSIDE_URL}',
         PUBLIC_PATH: '${process.env.PUBLIC_PATH}',
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
