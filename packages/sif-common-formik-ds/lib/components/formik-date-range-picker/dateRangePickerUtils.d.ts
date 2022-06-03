import { DateRange } from '../../types';
import { DatepickerLimitiations } from '../formik-datepicker/FormikDatepicker';
export declare const getRangesStartingAfterDate: (date: Date, dateRanges?: DateRange[]) => DateRange[];
export declare const getRangesEndingBeforeDate: (date: Date, dateRanges?: DateRange[]) => DateRange[];
export declare const findClosestDateAfterDate: (fromDate: Date, dates: Date[]) => Date | undefined;
export declare const findClosestDateBeforeDate: (fromDate: Date, dates: Date[]) => Date | undefined;
export declare const findClosestDateBeforeOrEqualDate: (fromDate: Date, dates: Date[]) => Date | undefined;
export declare const getClosestDateRangeBeforeDate: (date: Date, ranges: DateRange[]) => DateRange | undefined;
export declare const getClosestDateRangeAfterDate: (date: Date, ranges: DateRange[]) => DateRange | undefined;
export declare const getMaxDateForRangeStart: ({ fromDate, toDate, maxDate, otherRanges: dateRanges, allowRangesToStartAndStopOnSameDate, }: {
    fromDate?: Date | undefined;
    toDate?: Date | undefined;
    maxDate?: Date | undefined;
    otherRanges?: DateRange[] | undefined;
    allowRangesToStartAndStopOnSameDate?: boolean | undefined;
}) => Date | undefined;
export declare const getMaxDateForRangeEnd: ({ fromDate, toDate, maxDate, dateRanges, allowRangesToStartAndStopOnSameDate, }: {
    fromDate?: Date | undefined;
    toDate?: Date | undefined;
    maxDate?: Date | undefined;
    dateRanges?: DateRange[] | undefined;
    allowRangesToStartAndStopOnSameDate?: boolean | undefined;
}) => Date | undefined;
export declare const getMinDateForRangeStart: ({ toDate, minDate, dateRanges, allowRangesToStartAndStopOnSameDate, }: {
    toDate?: Date | undefined;
    minDate?: Date | undefined;
    dateRanges?: DateRange[] | undefined;
    allowRangesToStartAndStopOnSameDate?: boolean | undefined;
}) => Date | undefined;
export declare const getMinDateForRangeEnd: ({ fromDate, toDate, minDate, dateRanges: otherRanges, allowRangesToStartAndStopOnSameDate, }: {
    fromDate?: Date | undefined;
    toDate?: Date | undefined;
    minDate?: Date | undefined;
    dateRanges?: DateRange[] | undefined;
    allowRangesToStartAndStopOnSameDate?: boolean | undefined;
}) => Date | undefined;
interface DateRangePickerLimitations {
    fromDateLimitations: DatepickerLimitiations;
    toDateLimitations: DatepickerLimitiations;
}
export declare const getDateRangePickerLimitations: (props: {
    fromDate?: Date;
    toDate?: Date;
    minDate?: Date;
    maxDate?: Date;
    dateRanges?: DateRange[];
    disableWeekend?: boolean;
    allowRangesToStartAndStopOnSameDate?: boolean;
}) => DateRangePickerLimitations;
export {};
//# sourceMappingURL=dateRangePickerUtils.d.ts.map