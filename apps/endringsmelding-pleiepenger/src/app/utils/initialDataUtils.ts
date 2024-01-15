import { DateRange } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';

export const getPeriodeForArbeidsgiverOppslag = (
    dateRangeAlleSaker: DateRange,
    tillattEndringsperiode: DateRange,
): DateRange | undefined => {
    const dateRange = {
        from: dayjs.max(dayjs(dateRangeAlleSaker.from), dayjs(tillattEndringsperiode.from))!.toDate(),
        to: dayjs.min(dayjs(dateRangeAlleSaker.to), dayjs(tillattEndringsperiode.to))!.toDate(),
    };
    if (dayjs(dateRange.to).isBefore(dateRange.from)) {
        return undefined;
    }
    return dateRange;
};
