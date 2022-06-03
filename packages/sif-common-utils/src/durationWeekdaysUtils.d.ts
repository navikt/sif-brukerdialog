import { Duration, DurationWeekdays, NumberDuration } from './';
import { DateDurationMap, DateRange, ISODurationWeekdays, Weekday } from './types';
export declare const getISOWeekdaysFromDurationWeekdays: (durationWeekdays: DurationWeekdays) => number[];
export declare const summarizeDurationInDurationWeekdays: (weekdays: DurationWeekdays) => NumberDuration;
export declare const getDurationForISOWeekdayNumber: (durationWeekdays: DurationWeekdays, isoWeekday: number) => Duration | undefined;
export declare const getNumberDurationForWeekday: (fasteDager: DurationWeekdays, weekday: Weekday) => NumberDuration | undefined;
export declare const durationWeekdaysToISODurationWeekdays: ({ monday, tuesday, wednesday, thursday, friday, }: DurationWeekdays) => ISODurationWeekdays;
export declare const getPercentageOfDurationWeekdays: (percentage: number, weekdays: DurationWeekdays) => DurationWeekdays;
export declare const durationWeekdaysFromHoursPerWeek: (timer: number) => DurationWeekdays;
export declare const getWeekdaysWithDuration: (durationWeekdays: DurationWeekdays) => Weekday[];
export declare const ensureCompleteDurationWeekdays: (durationWeekdays: DurationWeekdays) => DurationWeekdays;
export declare const getAllWeekdaysWithoutDuration: (durationWeekdays: DurationWeekdays) => Weekday[];
export declare const hasWeekdaysWithoutDuration: (durationWeekdays: DurationWeekdays) => boolean;
export declare const removeDurationWeekdaysNotInDurationWeekdays: (weekdays1: DurationWeekdays, weekdays2: DurationWeekdays) => DurationWeekdays;
export declare const removeDurationWeekdaysWithNoDuration: ({ monday, tuesday, wednesday, thursday, friday, }: DurationWeekdays) => DurationWeekdays;
export declare const getDateDurationMapFromDurationWeekdaysInDateRange: (dateRange: DateRange, durationWeekdays: DurationWeekdays) => DateDurationMap;
//# sourceMappingURL=durationWeekdaysUtils.d.ts.map