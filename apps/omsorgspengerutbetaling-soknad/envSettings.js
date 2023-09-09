const process = require('process');
require('dotenv').config();

const envSettings = () => {
    const appSettings = `
     window.appSettings = {
         API_URL: '${process.env.API_URL}',
         VEDLEGG_API_URL: '${process.env.VEDLEGG_API_URL}',
         FRONTEND_API_PATH: '${process.env.FRONTEND_API_PATH}',
         FRONTEND_VEDLEGG_URL:'${process.env.FRONTEND_VEDLEGG_URL}',
         PUBLIC_PATH: '${process.env.PUBLIC_PATH}',
         LOGIN_URL: '${process.env.LOGIN_URL}',
         NYNORSK: '${process.env.NYNORSK}',
         APPSTATUS_PROJECT_ID: '${process.env.APPSTATUS_PROJECT_ID}',
         APPSTATUS_DATASET: '${process.env.APPSTATUS_DATASET}',
         SKIP_ORGNUM_VALIDATION: '${process.env.SKIP_ORGNUM_VALIDATION}',
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
