import * as countries from 'i18n-iso-countries';

countries.registerLocale(require('i18n-iso-countries/langs/nb.json'));
countries.registerLocale(require('i18n-iso-countries/langs/nn.json'));

export const getLocaleKey = (locale: string): string => {
    switch (locale) {
        case 'nn':
        case 'no-NN':
            return 'nn';
        default:
            return 'nb';
    }
};

export const getCountryName = (alphaCode: string, locale: string): string => {
    return countries.getName(alphaCode, getLocaleKey(locale));
};

export const getCountries = () => countries;
