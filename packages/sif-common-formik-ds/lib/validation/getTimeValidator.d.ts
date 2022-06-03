import { ValidationFunction } from './types';
export declare enum ValidateTimeError {
    timeHasNoValue = "timeHasNoValue",
    hoursAreInvalid = "hoursAreInvalid",
    hoursAreNegative = "hoursAreNegative",
    minutesAreInvalid = "minutesAreInvalid",
    minutesAreNegative = "minutesAreNegative",
    tooManyHours = "tooManyHours",
    tooManyMinutes = "tooManyMinutes",
    durationIsTooLong = "durationIsTooLong",
    durationIsTooShort = "durationIsTooShort"
}
declare type TimeValidationResult = undefined | ValidateTimeError.timeHasNoValue | ValidateTimeError.hoursAreInvalid | ValidateTimeError.hoursAreNegative | ValidateTimeError.minutesAreInvalid | ValidateTimeError.minutesAreNegative | ValidateTimeError.durationIsTooLong | ValidateTimeError.durationIsTooShort | ValidateTimeError.tooManyHours | ValidateTimeError.tooManyMinutes;
declare type TimeRange = {
    hours: number;
    minutes: number;
};
interface Options {
    required?: boolean;
    min?: TimeRange;
    max?: TimeRange;
}
declare const getTimeValidator: (options?: Options) => ValidationFunction<TimeValidationResult>;
export default getTimeValidator;
//# sourceMappingURL=getTimeValidator.d.ts.map