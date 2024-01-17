import soknadIntlMessages from '../src/i18n/soknadIntlMessages';

const locales = ['nb', 'nn'];

const messages = locales.reduce(
    (acc, lang) => ({
        ...acc,
        [lang]: lang === 'nb' ? soknadIntlMessages.nb : soknadIntlMessages.nn, // whatever the relative path to your messages json is
    }),
    {},
);

const formats = {}; // optional, if you have any formats

export const reactIntl = {
    defaultLocale: 'nb',
    locales,
    messages,
    formats,
};
