import { ValidationFunction } from './types';
export declare enum ValidateNumberError {
    numberHasNoValue = "numberHasNoValue",
    numberHasInvalidFormat = "numberHasInvalidFormat",
    numberIsTooSmall = "numberIsTooSmall",
    numberIsTooLarge = "numberIsTooLarge",
    numberHasDecimals = "numberHasDecimals"
}
declare type NumberValidationResult = undefined | ValidateNumberError.numberHasNoValue | ValidateNumberError.numberHasInvalidFormat | ValidateNumberError.numberIsTooLarge | ValidateNumberError.numberIsTooSmall | ValidateNumberError.numberHasDecimals;
interface Options {
    required?: boolean;
    min?: number;
    max?: number;
    allowDecimals?: boolean;
}
declare const getNumberValidator: (options?: Options) => ValidationFunction<NumberValidationResult>;
export default getNumberValidator;
//# sourceMappingURL=getNumberValidator.d.ts.map