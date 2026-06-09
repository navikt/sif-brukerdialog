import { Locale } from '@navikt/sif-common-utils';
import cookies from 'js-cookie';

const LocaleSessionKey = 'selectedLocale';

const getLocaleFromDecoratorCookie = (): Locale | undefined => {
    const value = cookies.get('decorator-language');
    if (value === 'nb' || value === 'nn') {
        return value;
    }
    return undefined;
};

const getLocaleFromSessionStorage = (): Locale => {
    return (sessionStorage.getItem(LocaleSessionKey) as Locale) || getLocaleFromDecoratorCookie() || 'nb';
};

const setLocaleInSessionStorage = (locale: Locale): void => {
    sessionStorage.setItem(LocaleSessionKey, locale);
};

const getNynorskLocale = () => {
    if (Intl.NumberFormat.supportedLocalesOf('no-NN').length > 0) {
        return 'no-NN';
    }
    return 'nn';
};

const getBokmålLocale = () => {
    if (Intl.NumberFormat.supportedLocalesOf('no-NB').length > 0) {
        return 'no-NB';
    }
    return 'nb';
};

const getLocaleForApi = (locale: string): Locale => {
    switch (locale) {
        case 'nn':
        case 'no-NN':
            return 'nn';
        default:
            return 'nb';
    }
};

export const decoratorLocaleUtils = {
    getLocaleFromDecoratorCookie,
    getLocaleFromSessionStorage,
    setLocaleInSessionStorage,
    getNynorskLocale,
    getBokmålLocale,
    getLocaleForApi,
};
