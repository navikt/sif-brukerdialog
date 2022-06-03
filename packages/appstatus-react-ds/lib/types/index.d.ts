import { SanityStatusMessage } from './sanityObjects';
export declare enum Status {
    'normal' = "normal",
    'unavailable' = "unavailable"
}
export declare type TeamStatus = Status;
export declare type ApplicationStatus = Status | ApplicationInheritTeamStatus;
export declare enum ApplicationInheritTeamStatus {
    'team' = "team"
}
export interface SanityConfig {
    projectId: string;
    dataset: string;
    token?: string;
}
export declare enum SanityMessageType {
    'info' = "info",
    'warning' = "warning",
    'error' = "error"
}
export interface AppState {
    status: Status;
    message?: SanityStatusMessage;
}
export interface SanityError {
    isNetworkError: boolean;
    request: {
        uri: string;
    };
    message: string;
    stack: string;
}
export declare type StringBlockValue = string | string[];
export declare type BlockContentType = string | string[];
export declare type SanityLocale = 'nb' | 'nn';
export declare const sanityDefaultLocale: SanityLocale;
export interface LocaleStringObject {
    nb: string;
    nn?: string;
}
export interface LocaleRichTextObject {
    nb: StringBlockValue;
    nn?: StringBlockValue;
}
export declare type LocaleObject = LocaleStringObject | LocaleRichTextObject;
export declare const isValidLocaleObject: (obj: any) => obj is LocaleObject;
export declare const isValidLocaleStringObject: (obj: any) => obj is LocaleStringObject;
//# sourceMappingURL=index.d.ts.map