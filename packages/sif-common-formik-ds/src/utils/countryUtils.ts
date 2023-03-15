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
    // i18n-iso-countries 7.5.0 bruker 'XKX' 'alpha3Code' for Kosovo. 'XXK' kode brukes i NAV.
    // Endrer NAV sin landkode av Kosovo til i18n-iso-countries sin landkode for å hente riktig landsnavn.
    if (alphaCode === 'XXK') {
        alphaCode = 'XKX';
    }
    return countries.getName(alphaCode, getLocaleKey(locale));
};

export const getAlpha3Code = (alpha2Code: string) => {
    const countryAlpha3Code = countries.alpha2ToAlpha3(alpha2Code).toUpperCase();

    // i18n-iso-countries 7.5.0 bruker 'XKX' 'alpha3Code' for Kosovo. 'XXK' kode brukes i NAV.
    // Endrer i18n-iso-countries sin landkode til landkode som brukes i NAV for å sende riktig kode videre.
    return countryAlpha3Code === 'XKX' ? 'XXK' : countryAlpha3Code;
};

export const getCountries = () => countries;
