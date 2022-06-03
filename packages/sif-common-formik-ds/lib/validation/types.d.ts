export interface IntlErrorObject {
    key: string;
    values?: {
        [key: string]: any;
    };
    keepKeyUnaltered?: boolean;
}
export declare const isIntlErrorObject: (error: any) => error is IntlErrorObject;
export declare type ValidationError = string | IntlErrorObject;
export declare type ValidationResult<ValidationErrors> = ValidationErrors | undefined;
export declare type ValidationFunction<ValidationErrors> = (value: any) => ValidationResult<ValidationErrors>;
//# sourceMappingURL=types.d.ts.map