import { ValidationFunction } from './types';
export declare enum ValidateDateError {
    dateHasNoValue = "dateHasNoValue",
    dateHasInvalidFormat = "dateHasInvalidFormat",
    dateIsBeforeMin = "dateIsBeforeMin",
    dateIsAfterMax = "dateIsAfterMax",
    dateIsNotWeekday = "dateIsNotWeekday"
}
export declare type DateValidationResult = ValidateDateError.dateHasNoValue | ValidateDateError.dateHasInvalidFormat | ValidateDateError.dateIsBeforeMin | ValidateDateError.dateIsAfterMax | ValidateDateError.dateIsNotWeekday | undefined;
export interface DateValidationOptions {
    required?: boolean;
    min?: Date;
    max?: Date;
    onlyWeekdays?: boolean;
}
declare const getDateValidator: (options?: DateValidationOptions) => ValidationFunction<DateValidationResult>;
export default getDateValidator;
//# sourceMappingURL=getDateValidator.d.ts.map