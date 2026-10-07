import type { CustomValidatorResult } from 'sanity';

import { defaultLocale } from '../schemas/locales';

export const validateLocaleString = (obj: Record<string, unknown> | undefined): CustomValidatorResult => {
    if (obj === undefined || obj[defaultLocale] === undefined || obj[defaultLocale] === '') {
        return 'Påkrevd felt';
    }
    return true;
};
