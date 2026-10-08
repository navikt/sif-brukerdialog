import { defaultLocale } from '../schemas/locales';

type LocaleContent<T> = Record<string, T | undefined> | undefined;

export const hasLocaleValue = <T>(node: LocaleContent<T>, locale: string): boolean => {
    return node !== undefined && node[locale] !== undefined && node[locale] !== '';
};

export const getLocaleContent = <T>(node: LocaleContent<T>, locale?: string): T | undefined => {
    if (hasLocaleValue(node, locale || defaultLocale)) {
        return node?.[locale || defaultLocale];
    }
    if (hasLocaleValue(node, defaultLocale)) {
        return node?.[defaultLocale];
    }
    return undefined;
};
