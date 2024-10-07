/* eslint-disable no-console */
const { JSDOM } = require('jsdom');

const extractDecoratorFragments = (html, appSettings) => {
    const { document } = new JSDOM(html).window;
    const prop = 'innerHTML';

    if (!appSettings) {
        throw 'extractDecoratorFragments: appSettings is undefined';
    }
    if (typeof appSettings === 'string') {
        throw 'extractDecoratorFragments: appSettings must be an object';
    }

    return {
        NAV_SCRIPTS: document.getElementById('scripts')[prop],
        NAV_STYLES: document.getElementById('styles')[prop],
        NAV_HEADING: document.getElementById('header-withmenu')[prop],
        NAV_FOOTER: document.getElementById('footer-withmenu')[prop],
        APP_SETTINGS: JSON.stringify(appSettings),
    };
};

const decoratorParams = new URLSearchParams({
    simple: 'true',
});

const getDecorator = (appSettings) =>
    new Promise((resolve, reject) => {
        console.log('Fetching decorator from', process.env.SIF_PUBLIC_DEKORATOR_URL);
        console.log('Fetching decorator from', process.env.DEKORATOR_URL);
        fetch(`${process.env.SIF_PUBLIC_DEKORATOR_URL}`, decoratorParams)
            .then((response) => response.text())
            .then((html) => {
                if (html) {
                    resolve(extractDecoratorFragments(html, appSettings));
                } else {
                    try {
                        console.log('Failed to get decorator. Exiting node.');
                        process.exit(1);
                    } catch (err) {
                        console.log(err);
                        reject(err);
                    }
                }
            });
    });

module.exports = getDecorator;
