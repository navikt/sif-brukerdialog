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

export const decoratorLocaleUtils = {
    getLocaleFromSessionStorage,
    setLocaleInSessionStorage,
};
