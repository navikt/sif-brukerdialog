import { DateRange, YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { dateRangeUtils, getWeeksInDateRange } from '@navikt/sif-common-utils/lib';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { ArbeidsukeInfo } from '../ArbeidsukeInfo';

export const isYesOrNoAnswered = (answer?: YesOrNo) => {
    return answer !== undefined && (answer === YesOrNo.NO || answer === YesOrNo.YES);
};

dayjs.extend(weekOfYear);
dayjs.extend(isoWeek);

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

export const periodeInneholderToHeleArbeidsuker = (periode: DateRange): boolean => {
    const uker = getWeeksInDateRange(periode).map(getArbeidsukeInfoIPeriode);
    return uker.filter((uke) => uke.erFullArbeidsuke === true).length >= 2;
};

export const skalSvarePåOmEnJobberLiktIPerioden = (periode?: DateRange) =>
    periode ? periodeInneholderToHeleArbeidsuker(periode) : true;
