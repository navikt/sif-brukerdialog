import { DateRange } from '@navikt/sif-common-formik-ds/lib';
import { dateRangeUtils } from '@navikt/sif-common-utils/lib';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { ArbeidsukeInfo } from '../types/_ArbeidsukeInfo';

dayjs.extend(weekOfYear);

export const getArbeidsdagerPeriode = ({ from, to }: DateRange): DateRange | undefined => {
    const startIsoWeekday = dayjs(from).isoWeekday();
    if (startIsoWeekday > 5) {
        return undefined;
    }
    const endIsoWeekday = dayjs(to).isoWeekday();
    if (endIsoWeekday <= 5) {
        return {
            from,
            to,
        };
    }
    return { from, to: dayjs(from).startOf('isoWeek').add(4, 'days').toDate() };
};

export const getArbeidsukeInfoIPeriode = (dateRange: DateRange): ArbeidsukeInfo => {
    const antallArbeidsdager = dateRangeUtils.getNumberOfDaysInDateRange(dateRange, true);
    return {
        årstall: dateRange.from.getFullYear(),
        periode: dateRange,
        ukenummer: dayjs(dateRange.from).week(),
        arbeidsdagerPeriode: getArbeidsdagerPeriode(dateRange),
        erFullArbeidsuke: antallArbeidsdager === 5,
    };
};
