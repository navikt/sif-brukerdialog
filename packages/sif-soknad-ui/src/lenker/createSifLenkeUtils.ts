import { useIntl } from 'react-intl';

import { getSifLenke, getSifLenker, SifLenkeKey, SifLenker, SifLenkerEnvironment, SifLenkerLocale } from './sifLenker';

interface CreateSifLenkeUtilsParams {
    getEnvironment: () => SifLenkerEnvironment;
    getLocale?: (locale?: string) => SifLenkerLocale;
}

interface SifLenkeUtils {
    getLenker: (locale?: string) => SifLenker;
    getLenke: (key: SifLenkeKey, locale?: string) => string;
    useLenker: () => SifLenker;
}

export const createSifLenkeUtils = ({
    getEnvironment,
    getLocale = (locale?: string) => (locale === 'nn' ? 'nn' : 'nb'),
}: CreateSifLenkeUtilsParams): SifLenkeUtils => {
    const getLenker = (locale?: string): SifLenker => getSifLenker(getLocale(locale), getEnvironment());

    const getLenke = (key: SifLenkeKey, locale?: string): string =>
        getSifLenke(key, getLocale(locale), getEnvironment());

    const useLenker = (): SifLenker => {
        const intl = useIntl();

        return getLenker(intl.locale);
    };

    return {
        getLenke,
        getLenker,
        useLenker,
    };
};

export type { CreateSifLenkeUtilsParams, SifLenkeUtils };
