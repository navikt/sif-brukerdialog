import { DateRange, sortDateRange } from '@navikt/sif-common-utils/lib';
import dayjs from 'dayjs';

export const dateRangesHasFromDateEqualPreviousRangeToDate = (ranges: DateRange[]): boolean => {
    if (ranges.length > 0) {
        const sortedDates = ranges.sort(sortDateRange);
        const hasStartDateEqualPreviousRangeToDate = ranges.find((d, idx) => {
            if (idx > 0) {
                return dayjs(d.from).isSame(sortedDates[idx - 1].to, 'day');
            }
            return false;
        });
        return hasStartDateEqualPreviousRangeToDate !== undefined;
    }
    return false;
};
