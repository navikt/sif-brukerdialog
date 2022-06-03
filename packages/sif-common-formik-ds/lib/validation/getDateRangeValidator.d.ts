import { DateValidationOptions, DateValidationResult } from './getDateValidator';
import { ValidationFunction } from './types';
export declare enum ValidateDateRangeError {
    toDateIsBeforeFromDate = "toDateIsBeforeFromDate",
    fromDateIsAfterToDate = "fromDateIsAfterToDate"
}
declare type DateRangeValidationResult = DateValidationResult | ValidateDateRangeError.fromDateIsAfterToDate | ValidateDateRangeError.toDateIsBeforeFromDate | undefined;
interface Options extends DateValidationOptions {
    fromDate?: Date;
    toDate?: Date;
}
declare const getDateRangeValidator: (options: Options) => {
    validateFromDate: ValidationFunction<DateRangeValidationResult>;
    validateToDate: ValidationFunction<DateRangeValidationResult>;
};
export default getDateRangeValidator;
//# sourceMappingURL=getDateRangeValidator.d.ts.map