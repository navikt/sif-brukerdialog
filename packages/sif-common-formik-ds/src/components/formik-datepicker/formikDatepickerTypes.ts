import { DateRange } from '../../types';

export interface FormikDatepickerLimitations {
    minDate?: Date;
    maxDate?: Date;
    disabledDateRanges?: DateRange[];
    disableWeekend?: boolean;
    disabledDaysOfWeek?: number[];
}
