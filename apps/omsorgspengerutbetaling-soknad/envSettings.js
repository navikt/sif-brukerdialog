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
         FRONTEND_VEDLEGG_URL:'${process.env.FRONTEND_VEDLEGG_URL}',
         GITHUB_REF_NAME: '${process.env.GITHUB_REF_NAME}',
         IMAGE: '${process.env.IMAGE}',
         LOGIN_URL: '${process.env.LOGIN_URL}',
         NYNORSK: '${process.env.NYNORSK}',
         PUBLIC_PATH: '${process.env.PUBLIC_PATH}',
         SKIP_ORGNUM_VALIDATION: '${process.env.SKIP_ORGNUM_VALIDATION}',
         VEDLEGG_API_URL: '${process.env.VEDLEGG_API_URL}',
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
