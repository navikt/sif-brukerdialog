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
                API_URL: 'https://pleiepenger.herokuapp.com/',
                FRONTEND_API_PATH: 'https://pleiepenger.herokuapp.com',
                FRONTEND_VEDLEGG_URL: 'https://pleiepenger.herokuapp.com/api',
                LOGIN_URL: 'https://pleiepenger.herokuapp.com/',
                APPSTATUS_PROJECT_ID: 'ryujtq87',
                APPSTATUS_DATASET: 'staging',
                USE_AMPLITUDE: 'on',
                PUBLIC_PATH: '',
                TOGGLE_FERIEUTTAK: 'on',
                TOGGLE_FERIEUTTAK: 'on',
                TOGGLE_FRILANS: 'on',
                TOGGLE_SELVSTENDIG: 'on'
            };`
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
