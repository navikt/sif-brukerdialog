import { ValidationFunction } from './types';
export declare enum ValidateStringError {
    stringHasNoValue = "stringHasNoValue",
    stringIsNotAString = "stringIsNotAString",
    stringIsTooShort = "stringIsTooShort",
    stringIsTooLong = "stringIsTooLong",
    stringHasInvalidFormat = "stringHasInvalidFormat"
}
declare type StringValidationResult = undefined | ValidateStringError.stringHasNoValue | ValidateStringError.stringIsNotAString | ValidateStringError.stringIsTooLong | ValidateStringError.stringIsTooShort | ValidateStringError.stringHasInvalidFormat;
interface Options {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    formatRegExp?: RegExp;
}
declare const getStringValidator: (options?: Options) => ValidationFunction<StringValidationResult>;
export default getStringValidator;
//# sourceMappingURL=getStringValidator.d.ts.map