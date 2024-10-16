/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { defaultLocale } from '../schemas/locales';

export const validateLocaleString = (obj: any) => {
    if (obj === undefined || obj[defaultLocale] === undefined || obj[defaultLocale] === '') {
        return 'Påkrevd felt';
    }
    return true;
};

export const localeContentValidation = (Rule: any) =>
    Rule.custom((obj: any) => {
        return validateLocaleString(obj);
    });
