import { getNames, registerLocale, alpha2ToAlpha3, getName } from 'i18n-iso-countries';
import * as langNB from 'i18n-iso-countries/langs/nb.json';
import * as langNN from 'i18n-iso-countries/langs/nn.json';
import { eøsCountries } from './eøsCountries';

registerLocale(langNB);
registerLocale(langNN);

interface Country {
    name: string;
    alpha3: string;
}

/**
 * NAV sin landkode for Kosovo er ikke lik koden som brukes i i18n-iso-countries.
 * Nedenfor er et par utils for å håndtere disse ulikhetene
 */
export const NAV_KOSOVO_ALPHA3_CODE = 'XXK';
export const ISO_COUNTRIES_KOSOVO_ALPHA3_CODE = alpha2ToAlpha3('XK') || 'XKX';

/** Finner riktig kode for innsending til NAV systemer */
export const ensureValid3AlphaCodeForNAV = (alphaCode: string): string => {
    const alpha3Code = alphaCode.length === 2 ? alpha2ToAlpha3(alphaCode) : alphaCode;
    if (!alpha3Code) {
        throw `countryUtils: ensureValidCodeForNAV:  ${alphaCode}`;
    }
    if (alpha3Code.toUpperCase() === ISO_COUNTRIES_KOSOVO_ALPHA3_CODE) {
        return NAV_KOSOVO_ALPHA3_CODE;
    }
    return alpha3Code;
};

/** Finner riktig kode for bruk mot i18n-iso-countries */
export const ensureValidAlpha3CodeForIsoCountries = (alphaCode: string): string => {
    const alpha3Code = alphaCode.length === 2 ? alpha2ToAlpha3(alphaCode) : alphaCode;
    if (!alpha3Code) {
        throw `countryUtils: ensureValidCodeForIsoCountries:  ${alphaCode}`;
    }
    if (alpha3Code === NAV_KOSOVO_ALPHA3_CODE) {
        return ISO_COUNTRIES_KOSOVO_ALPHA3_CODE;
    }
    return alpha3Code;
};

/**
 * @param alphaCode lankode
 * @param locale språkkode
 * @returns navn på land
 */
export const getCountryName = (alphaCode: string, locale: string): string => {
    const lang = locale === 'nn' || locale === 'no-NN' ? 'nn' : 'nb';
    const name = getName(ensureValidAlpha3CodeForIsoCountries(alphaCode), lang);
    if (!name) {
        throw `countryUtils: getCountryName:  ${alphaCode}`;
    }
    return name;
};

/**
 * @param alphaCode Alpha2 eller Alpha3 kode for landet som brukes for å slå opp i listen over eøs/eftaland
 * @returns boolean
 */
export const countryIsMemberOfEøsOrEfta = (alphaCode: string): boolean => {
    return eøsCountries.some((country) => (alphaCode.length === 2 ? country.alpha2 : country.alpha3) === alphaCode);
};

/**
 *
 * @param onlyEuAndEftaCountries Om bare eøs/efta-land skal returneres
 * @param lang Språkkode som skal brukes
 * @returns liste over alle land/kun eøs-land med navn ut fra lang
 */

export const getCountries = (onlyEuAndEftaCountries: boolean, lang: string): Array<Country> => {
    const names: [string, any][] = Object.entries(getNames(lang));
    return names
        .sort((a: string[], b: string[]) => a[1].localeCompare(b[1], lang))
        .filter((countryOptionValue: string[]) =>
            onlyEuAndEftaCountries ? countryIsMemberOfEøsOrEfta(countryOptionValue[0]) : true,
        )
        .map((countryOptionValue) => ({
            name: countryOptionValue[1],
            alpha2: countryOptionValue[0],
            alpha3: ensureValid3AlphaCodeForNAV(countryOptionValue[0]),
        }));
};
