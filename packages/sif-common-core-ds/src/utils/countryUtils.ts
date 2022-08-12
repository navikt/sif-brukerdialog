import * as countries from 'i18n-iso-countries';

countries.registerLocale(require('i18n-iso-countries/langs/nb.json'));
countries.registerLocale(require('i18n-iso-countries/langs/nn.json'));

export const eøsAndEftaCountries: any = {
    NO: true,
    BE: true,
    BG: true,
    DK: true,
    EE: true,
    FI: true,
    FR: true,
    GR: true,
    IE: true,
    IS: true,
    IT: true,
    HR: true,
    CY: true,
    LV: true,
    LI: true,
    LT: true,
    LU: true,
    MT: true,
    NL: true,
    PL: true,
    PT: true,
    RO: true,
    SK: true,
    SI: true,
    ES: true,
    SE: true,
    CZ: true,
    DE: true,
    HU: true,
    AT: true,
    CH: true,
};

const ANTARTICA = 'AQ';

const isoCodeIndex = 0;
const countryNameIndex = 1;

export interface Country {
    isoCode: string;
    name: string;
}

export const countryIsMemberOfEøsOrEfta = (isoCode: string) => {
    let isoCodeToUse = isoCode.toUpperCase();
    isoCodeToUse = isoCodeToUse.length === 2 ? isoCodeToUse : countries.alpha3ToAlpha2(isoCodeToUse);
    return eøsAndEftaCountries[isoCodeToUse.toUpperCase()] === true;
};

const simplifyLocalizedName = (name: string | string[]): string => {
    if (Array.isArray(name)) {
        return name[0];
    }
    return name;
};

const getCountryNames = (locale: string) => {
    return Object.entries(countries.getNames(locale)).map((name) => [name[0], simplifyLocalizedName(name[0])]);
};

export const getCountriesForLocale = (locale: string, onlyEøsOrEftaCountries?: boolean): Country[] => {
    return getCountryNames(locale)
        .filter((countryOptionValue) =>
            onlyEøsOrEftaCountries
                ? countryIsMemberOfEøsOrEfta(countryOptionValue[isoCodeIndex])
                : countryOptionValue[isoCodeIndex] !== ANTARTICA
        )
        .sort((a, b) => a[1].localeCompare(b[1], locale))
        .map((countryOptionValue: string[]) => ({
            isoCode: countryOptionValue[isoCodeIndex],
            name: countryOptionValue[countryNameIndex],
        }));
};

export const getCountryName = (isoCode: string, locale: string): string => {
    const names = getCountryNames(locale);
    return (names as any)[isoCode];
};

export const getCountries = () => countries;
