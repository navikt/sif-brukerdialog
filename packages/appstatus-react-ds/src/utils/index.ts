import {
    BlockContentType,
    isValidLocaleObject,
    isValidLocaleStringObject,
    LocaleObject,
    LocaleStringObject,
    sanityDefaultLocale,
    SanityLocale,
} from '../types';
import { SanityStatusMessage } from '../types/sanityObjects';

const hasLocaleValue = (obj?: LocaleObject, locale: SanityLocale = sanityDefaultLocale): boolean =>
    obj !== undefined &&
    ((obj[locale] !== undefined && obj[locale] !== '') ||
        (obj[sanityDefaultLocale] !== undefined && obj[sanityDefaultLocale] !== ''));

export const getLocaleObject = (
    obj: LocaleObject | undefined,
    locale: SanityLocale = sanityDefaultLocale
): object | string | undefined =>
    obj && hasLocaleValue(obj, locale) ? obj[locale] || obj[sanityDefaultLocale] : undefined;

export const getLocaleString = (obj: LocaleStringObject, locale: SanityLocale = sanityDefaultLocale): string =>
    obj[locale] || obj[sanityDefaultLocale] || '';

export const getOptionalLocaleValue = (obj?: LocaleObject, locale?: SanityLocale): object | string | undefined =>
    isValidLocaleObject(obj) ? getLocaleObject(obj, locale) : undefined;

export const getOptionalLocaleString = ({
    obj,
    locale,
}: {
    obj?: LocaleObject;
    locale: SanityLocale;
}): string | undefined => {
    return isValidLocaleStringObject(obj) ? getLocaleString(obj, locale) : undefined;
};

export const getLocaleBlockContent = (
    obj: LocaleObject | undefined,
    locale: SanityLocale = sanityDefaultLocale
): BlockContentType | undefined => (obj && hasLocaleValue(obj, locale) ? obj[locale] || obj[sanityDefaultLocale] : []);

export const getMessage = (messages?: SanityStatusMessage[]): SanityStatusMessage | undefined =>
    messages && messages.length === 1 ? messages[0] : undefined;

export const sanityConfigIsValid = (config: any) => {
    const sanityConfigPropIsValid = (prop: any) => prop !== undefined && typeof prop === 'string' && prop.length > 5;
    try {
        return (
            config !== undefined &&
            sanityConfigPropIsValid(config['projectId']) &&
            sanityConfigPropIsValid(config['dataset'])
        );
    } catch {
        return false;
    }
};
