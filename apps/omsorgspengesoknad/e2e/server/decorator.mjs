/* eslint-disable no-console */
import { JSDOM } from 'jsdom';

const extractDecoratorFragments = (html, appSettings) => {
    const { document } = new JSDOM(html).window;
    const prop = 'innerHTML';

    if (!appSettings) {
        throw new Error('extractDecoratorFragments: appSettings is undefined');
    }
    if (typeof appSettings === 'string') {
        throw new Error('extractDecoratorFragments: appSettings must be an object');
    }

    return {
        NAV_SCRIPTS: document.getElementById('scripts')[prop],
        NAV_STYLES: document.getElementById('styles')[prop],
        NAV_HEADING: document.getElementById('header-withmenu')[prop],
        NAV_FOOTER: document.getElementById('footer-withmenu')[prop],
        APP_SETTINGS: JSON.stringify(appSettings),
    };
};

const decoratorParams = new URLSearchParams({ simple: 'true' });

const getDecorator = (appSettings) =>
    new Promise((resolve, reject) => {
        fetch(`${process.env.SIF_PUBLIC_DEKORATOR_URL}`, decoratorParams)
            .then((response) => response.text())
            .then((html) => {
                if (html) {
                    resolve(extractDecoratorFragments(html, appSettings));
                } else {
                    console.log('Failed to get decorator. Exiting node.');
                    process.exit(1);
                }
            })
            .catch((err) => {
                console.error('Error fetching decorator:', err);
                reject(err);
            });
    });

export default getDecorator;
