/* eslint-disable no-console */
const jsdom = require('jsdom');
const request = require('request');
const { JSDOM } = jsdom;

const requestDecorator = (callback) => {
    const baseUrl = process.env.DEKORATOR_URL;
    return request(`${baseUrl}/?simple=true`, callback);
};

const extractDecoratorFragments = (html) => {
    const { document } = new JSDOM(html).window;
    const prop = 'innerHTML';
    return {
        NAV_SCRIPTS: document.getElementById('scripts')[prop],
        NAV_STYLES: document.getElementById('styles')[prop],
        NAV_HEADING: document.getElementById('header-withmenu')[prop],
        NAV_FOOTER: document.getElementById('footer-withmenu')[prop],
        APP_SETTINGS: JSON.stringify({
            API_URL: `${process.env.API_URL}`,
            APP_VERSION: `${process.env.APP_VERSION}`,
            VEDLEGG_API_URL: `${process.env.VEDLEGG_API_URL}`,
            API_URL_INNSYN: `${process.env.API_URL_INNSYN}`,
            FRONTEND_INNSYN_API_PATH: `${process.env.FRONTEND_INNSYN_API_PATH}`,
            FRONTEND_API_PATH: `${process.env.FRONTEND_API_PATH}`,
            FRONTEND_VEDLEGG_URL: `${process.env.FRONTEND_VEDLEGG_URL}`,
            LOGIN_URL: `${process.env.LOGIN_URL}`,
            PUBLIC_PATH: `${process.env.PUBLIC_PATH}`,
            UTILGJENGELIG: `${process.env.UTILGJENGELIG}`,
            NYNORSK: `${process.env.NYNORSK}`,
            INNSYN: `${process.env.INNSYN}`,
            APPSTATUS_PROJECT_ID: `${process.env.APPSTATUS_PROJECT_ID}`,
            APPSTATUS_DATASET: `${process.env.APPSTATUS_DATASET}`,
            USE_AMPLITUDE: `${process.env.USE_AMPLITUDE}`,
            INNSYN_URL: `${process.env.INNSYN_URL}`,
            FORENKLET_ARBEID: `${process.env.FORENKLET_ARBEID}`,
            IMAGE: `${process.env.IMAGE}`,
            GITHUB_REF_NAME: `${process.env.GITHUB_REF_NAME}`,
        }),
    };
};

const getDecorator = () =>
    new Promise((resolve, reject) => {
        const callback = (error, response, body) => {
            if (!error && response.statusCode >= 200 && response.statusCode < 400) {
                resolve(extractDecoratorFragments(body));
            } else {
                try {
                    console.log(error);
                    console.log('Failed to get decorator. Exiting node.');
                    process.exit(1);
                } catch (err) {
                    console.log(err);
                    reject(err);
                }
            }
        };
        requestDecorator(callback);
    });

module.exports = getDecorator;
