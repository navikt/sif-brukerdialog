import { ValidationFunction } from './types';
export declare enum ValidateFødselsnummerError {
    fødselsnummerHasNoValue = "f\u00F8dselsnummerHasNoValue",
    fødselsnummerIsNot11Chars = "f\u00F8dselsnummerIsNot11Chars",
    fødselsnummerIsInvalid = "f\u00F8dselsnummerIsInvalid",
    fødselsnummerAsHnrIsNotAllowed = "f\u00F8dselsnummerAsHnrIsNotAllowed",
    fødselsnummerIsNotAllowed = "f\u00F8dselsnummerIsNotAllowed"
}
declare type FødselsnummerValidationResult = ValidateFødselsnummerError.fødselsnummerHasNoValue | ValidateFødselsnummerError.fødselsnummerIsNotAllowed | ValidateFødselsnummerError.fødselsnummerIsNot11Chars | ValidateFødselsnummerError.fødselsnummerIsInvalid | ValidateFødselsnummerError.fødselsnummerAsHnrIsNotAllowed | undefined;
interface Options {
    required?: boolean;
    disallowedValues?: string[];
    allowHnr?: boolean;
}
declare const getFødselsnummerValidator: (options?: Options) => ValidationFunction<FødselsnummerValidationResult>;
export default getFødselsnummerValidator;
//# sourceMappingURL=getF%C3%B8dselsnummerValidator.d.ts.map