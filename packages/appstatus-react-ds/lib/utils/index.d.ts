import { BlockContentType, LocaleObject, LocaleStringObject, SanityLocale } from '../types';
import { SanityStatusMessage } from '../types/sanityObjects';
export declare const getLocaleObject: (obj: LocaleObject | undefined, locale?: SanityLocale) => object | string | undefined;
export declare const getLocaleString: (obj: LocaleStringObject, locale?: SanityLocale) => string;
export declare const getOptionalLocaleValue: (obj?: LocaleObject, locale?: SanityLocale) => object | string | undefined;
export declare const getOptionalLocaleString: ({ obj, locale, }: {
    obj?: LocaleObject | undefined;
    locale: SanityLocale;
}) => string | undefined;
export declare const getLocaleBlockContent: (obj: LocaleObject | undefined, locale?: SanityLocale) => BlockContentType | undefined;
export declare const getMessage: (messages?: SanityStatusMessage[]) => SanityStatusMessage | undefined;
export declare const sanityConfigIsValid: (config: any) => boolean;
//# sourceMappingURL=index.d.ts.map