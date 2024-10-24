import { Locale } from '../types/Locale';
import cookies from 'js-cookie';
const LocaleSessionKey = 'selectedLocale';

export const getLocaleFromDecoratorCookie = (): Locale | undefined => {
    const value = cookies.get('decorator-language');
    if (value === 'nb' || value === 'nn') {
        return value;
    }
    return undefined;
};

export const getLocaleFromSessionStorage = (): Locale => {
    return (sessionStorage.getItem(LocaleSessionKey) as Locale) || getLocaleFromDecoratorCookie() || 'nb';
};

export const setLocaleInSessionStorage = (locale: Locale): void => {
    sessionStorage.setItem(LocaleSessionKey, locale);
};

export const getNynorskLocale = () => {
    if (Intl.NumberFormat.supportedLocalesOf('no-NN').length > 0) {
        return 'no-NN';
    }
    return 'nn';
};

export const getBokmålLocale = () => {
    if (Intl.NumberFormat.supportedLocalesOf('no-NB').length > 0) {
        return 'no-NB';
    }
    return 'nb';
};

export const getLocaleForApi = (locale: string): Locale => {
    switch (locale) {
        case 'nn':
        case 'no-NN':
            return 'nn';
        default:
            return 'nb';
    }
};
