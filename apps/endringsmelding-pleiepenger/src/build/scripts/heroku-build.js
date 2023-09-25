const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('../webpack/webpack.config.heroku');
const fsExtra = require('fs-extra');

function createEnvSettingsFileForHeroku() {
    const settingsFile = path.resolve(__dirname, './../../../heroku/dist/js/settings.js');
    fsExtra.ensureFile(settingsFile).then(() => {
        fsExtra.writeFileSync(
            settingsFile,
            `window.appSettings = {
                API_TOKENX_AUDIENCE: 'dev-gcp:dusseldorf:k9-brukerdialog-api',
                API_URL_INNSYN: 'https://endringsdialog-pleiepenger.herokuapp.com',
                API_URL: 'https://endringsdialog-pleiepenger.herokuapp.com',
                APP_VERSION: 'test',
                APPSTATUS_DATASET: 'staging',
                APPSTATUS_PROJECT_ID: 'ryujtq87',
                DEKORATOR_URL: 'https://www.nav.no/dekoratoren/?simple=true&chatbot=false',
                FRONTEND_API_PATH: 'https://endringsdialog-pleiepenger.herokuapp.com',
                FRONTEND_VEDLEGG_URL: 'https://endringsdialog-pleiepenger.herokuapp.com/api',
                FRONTEND_INNSYN_API_PATH: 'https://endringsdialog-pleiepenger.herokuapp.com/api',
                DOMAIN_URL: 'https://endringsdialog-pleiepenger.herokuapp.com',
                INNSYN_URL: 'https://endringsdialog-pleiepenger.herokuapp.com',
                LOGIN_URL: 'https://endringsdialog-pleiepenger.herokuapp.com/login?redirect_location=https://endringsdialog-pleiepenger.herokuapp.com',
                MELLOMLAGRING: 'on',
                MSW: 'on',
                PUBLIC_PATH: ''
            };`,
        );
    });
}

webpack(webpackConfig, (err, stats) => {
    if (err || (stats.compilation.errors && stats.compilation.errors.length > 0)) {
        let error = err || stats.compilation.errors;
        console.error(error);
        process.exit(1);
    }
});

createEnvSettingsFileForHeroku();
