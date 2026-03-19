import { alpha2ToAlpha3, getNames, registerLocale } from 'i18n-iso-countries';
import * as langNB from 'i18n-iso-countries/langs/nb.json';
import * as langNN from 'i18n-iso-countries/langs/nn.json';

import { eosCountries } from './eosCountries';

registerLocale(langNB);
registerLocale(langNN);

interface Country {
    name: string;
    alpha3: string;
}

const NAV_KOSOVO_ALPHA3_CODE = 'XXK';
const ISO_COUNTRIES_KOSOVO_ALPHA3_CODE = alpha2ToAlpha3('XK') || 'XKX';
const INVALID_ISO_COUNTRIES_KOSOVO_ALPHA3_CODE = 'XKK';

const ensureValid3AlphaCodeForNav = (alphaCode: string): string => {
    const alpha3Code = alphaCode.length === 2 ? alpha2ToAlpha3(alphaCode) : alphaCode;
    if (!alpha3Code) {
        throw new Error(`countryUtils: invalid alpha code: ${alphaCode}`);
    }
    if (
        [INVALID_ISO_COUNTRIES_KOSOVO_ALPHA3_CODE, ISO_COUNTRIES_KOSOVO_ALPHA3_CODE].includes(alpha3Code.toUpperCase())
    ) {
        return NAV_KOSOVO_ALPHA3_CODE;
    }
    return alpha3Code;
};

const countryIsMemberOfEosOrEfta = (alpha2: string): boolean => {
    return eosCountries.includes(alpha2);
};

export const getCountries = (onlyEuAndEftaCountries: boolean, lang: string): Country[] => {
    const names: Array<[string, string]> = Object.entries(getNames(lang) as Record<string, string>);

    return names
        .sort((a, b) => a[1].localeCompare(b[1], lang))
        .filter(([alpha2]) => (onlyEuAndEftaCountries ? countryIsMemberOfEosOrEfta(alpha2) : true))
        .map(([alpha2, name]) => ({
            name,
            alpha3: ensureValid3AlphaCodeForNav(alpha2),
        }));
};
