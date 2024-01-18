export type ValidLocale = 'nb' | 'nn';

export const getValidLocale = (locale: string): ValidLocale => {
    return locale === 'nn' ? 'nn' : 'nb';
};
