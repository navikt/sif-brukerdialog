import * as countries from 'i18n-iso-countries';

countries.registerLocale(require('i18n-iso-countries/langs/nb.json'));
countries.registerLocale(require('i18n-iso-countries/langs/nn.json'));

export const getCountryName = (alphaCode: string, locale: string): string => {
    return countries.getName(alphaCode, locale);
};

export const getCountries = () => countries;
