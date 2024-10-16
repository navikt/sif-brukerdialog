/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { defaultLocale } from '../schemas/locales';

export const getLocaleContent = (node: any, locale?: string) => {
    if (hasLocaleValue(node, locale || defaultLocale)) {
        return node[locale || defaultLocale];
    }
    if (hasLocaleValue(node, defaultLocale)) {
        return node[defaultLocale];
    }
    return undefined;
};

export const hasLocaleValue = (node: any, locale: string) => {
    return node !== undefined && node[locale] !== undefined && node[locale] !== '';
};
