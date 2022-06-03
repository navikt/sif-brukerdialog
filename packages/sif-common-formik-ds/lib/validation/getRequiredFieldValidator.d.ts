import { ValidationFunction } from './types';
export declare enum ValidateRequiredFieldError {
    'noValue' = "noValue"
}
declare type RequiredFieldValidationResult = ValidateRequiredFieldError.noValue | undefined;
declare const getRequiredFieldValidator: () => ValidationFunction<RequiredFieldValidationResult>;
export default getRequiredFieldValidator;
//# sourceMappingURL=getRequiredFieldValidator.d.ts.map