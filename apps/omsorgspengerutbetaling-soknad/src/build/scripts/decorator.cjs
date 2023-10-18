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
            APPSTATUS_DATASET: `${process.env.APPSTATUS_DATASET}`,
            APPSTATUS_PROJECT_ID: `${process.env.APPSTATUS_PROJECT_ID}`,
            FRONTEND_API_PATH: `${process.env.FRONTEND_API_PATH}`,
            FRONTEND_VEDLEGG_URL: `${process.env.FRONTEND_VEDLEGG_URL}`,
            GITHUB_REF_NAME: `${process.env.GITHUB_REF_NAME}`,
            IMAGE: `${process.env.IMAGE}`,
            LOGIN_URL: `${process.env.LOGIN_URL}`,
            MINSIDE_URL: `${process.env.MINSIDE_URL}`,
            NYNORSK: `${process.env.NYNORSK}`,
            PUBLIC_PATH: `${process.env.PUBLIC_PATH}`,
            SKIP_ORGNUM_VALIDATION: `${process.env.SKIP_ORGNUM_VALIDATION}`,
            VEDLEGG_API_URL: `${process.env.VEDLEGG_API_URL}`,
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
