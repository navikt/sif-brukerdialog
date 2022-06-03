import { DatepickerLimitations } from '@navikt/ds-datepicker';
import { DatepickerLimitiations } from './FormikDatepicker';
export declare const dateToISOString: (date?: Date) => string;
export declare const ISOStringToDate: (dateString?: string) => Date | undefined;
declare const datepickerUtils: {
    getDateStringFromValue: (value?: Date | string) => string | undefined;
    getDateFromDateString: (dateString: string | undefined) => Date | undefined;
    parseDateLimitations: ({ minDate, maxDate, disabledDateRanges, disableWeekend, disabledDaysOfWeek, }: DatepickerLimitiations) => DatepickerLimitations;
    isValidFormattedDateString: (dateString?: string) => boolean;
};
export default datepickerUtils;
//# sourceMappingURL=datepickerUtils.d.ts.map