import * as countries from 'i18n-iso-countries';

countries.registerLocale(require('i18n-iso-countries/langs/nb.json'));
countries.registerLocale(require('i18n-iso-countries/langs/nn.json'));

type EøsCountryMap = { [key: string]: boolean };

/** Kilde:
 * https://www.nav.no/no/person/flere-tema/arbeid-og-opphold-i-utlandet/relatert-informasjon/eos-landene
 */
export const eøsAndEftaCountries: EøsCountryMap = {
    AT: true, // Østerrike
    BE: true, // Belgia
    BG: true, // Bulgaria
    CH: true, // Sveits
    CY: true, // Kypros
    CZ: true, // Tsjekkia
    DE: true, // Tyskland
    DK: true, // Danmark
    EE: true, // Estland
    ES: true, // Spania
    FI: true, // Finland
    FR: true, // Frankrike
    GR: true, // Hellas
    HR: true, // Kroatia
    HU: true, // Ungarn
    IE: true, // Irland
    IS: true, // Island
    IT: true, // Italia
    LI: true, // Liechtenstein
    LT: true, // Litauen
    LU: true, // Luxembourg
    LV: true, // Latvia
    MT: true, // Malta
    NL: true, // Nederland
    NO: true, // Norge
    PL: true, // Polen
    PT: true, // Portugal
    RO: true, // Romania
    SE: true, // Sverige
    SI: true, // Slovenia
    SK: true, // Slovakia
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
    return eøsAndEftaCountries[isoCodeToUse] === true;
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
