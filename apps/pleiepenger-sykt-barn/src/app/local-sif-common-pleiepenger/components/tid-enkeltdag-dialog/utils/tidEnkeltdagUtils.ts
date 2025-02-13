import { datepickerUtils } from '@navikt/sif-common-formik-ds';
import {
    DateDurationMap,
    DateRange,
    dateToISODate,
    Duration,
    getDatesInDateRange,
    getFirstWeekdayOnOrAfterDate,
    getLastWeekdayOnOrBeforeDate,
    getMonthDateRange,
    getWeekDateRange,
    isDateWeekDay,
    ISODate,
    nthItemFilter,
} from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import { GjentagelseEnkeltdag, GjentagelseType, TidEnkeltdagFormValues } from '../TidEnkeltdagForm';

const getDagerMedInterval = (interval: number, periode: DateRange) => {
    const ukedag = dayjs(periode.from).isoWeekday();
    const datoer = getDatesInDateRange(periode, true);
    const dager = datoer.filter((dato) => dayjs(dato).isoWeekday() === ukedag);
    return dager.filter((_, index) => {
        return nthItemFilter(index, interval);
    });
};

const getGjentagendeDager = (endringsperiode: DateRange, dato: Date, gjentagelse?: GjentagelseEnkeltdag): ISODate[] => {
    if (gjentagelse) {
        let gjentagendeDatoer: Date[] = [];
        const periode: DateRange = {
            from: dato,
            to: gjentagelse.tom || endringsperiode.to,
        };
        if (gjentagelse.gjentagelsetype === GjentagelseType.hverUke) {
            gjentagendeDatoer = getDagerMedInterval(1, periode);
        }
        if (gjentagelse.gjentagelsetype === GjentagelseType.hverAndreUke) {
            gjentagendeDatoer = getDagerMedInterval(2, periode);
        }
        if (gjentagelse.gjentagelsetype === GjentagelseType.heleUken) {
            gjentagendeDatoer = getDatesInDateRange(getWeekDateRange(periode.from), true);
        }
        if (gjentagelse.gjentagelsetype === GjentagelseType.heleMåneden) {
            gjentagendeDatoer = getDatesInDateRange(getMonthDateRange(periode.from), true);
        }
        return gjentagendeDatoer.filter(isDateWeekDay).map((date) => dateToISODate(date));
    }
    return [dateToISODate(dato)];
};

export const getDagerMedNyTid = (
    endringsperiode: DateRange,
    dato: Date,
    varighet: Duration,
    gjentagelse?: GjentagelseEnkeltdag,
): DateDurationMap => {
    const datoerMedTid: DateDurationMap = {};
    const datoerSomSkalEndres = getGjentagendeDager(endringsperiode, dato, gjentagelse);
    datoerSomSkalEndres.forEach((isoDate) => {
        datoerMedTid[isoDate] = { ...varighet };
    });
    datoerMedTid[dateToISODate(dato)] = { ...varighet };
    return datoerMedTid;
};

export const getGjentagelseEnkeltdagFraFormValues = (
    values: Partial<TidEnkeltdagFormValues>,
): GjentagelseEnkeltdag | undefined => {
    const gjentagelse: GjentagelseEnkeltdag | undefined =
        values.gjentagelse && values.skalGjentas === true
            ? {
                  gjentagelsetype: values.gjentagelse,
                  tom: values.stopDato ? datepickerUtils.getDateFromDateString(values.stopDato) : undefined,
              }
            : undefined;
    return gjentagelse;
};

export const getDateRangeWithinDateRange = (range: DateRange, limitRange: DateRange): DateRange => {
    return {
        from: dayjs.max(dayjs(range.from), dayjs(limitRange.from))!.toDate(),
        to: dayjs.min(dayjs(range.to), dayjs(limitRange.to))!.toDate(),
    };
};
export const trimDateRangeToWeekdays = (range: DateRange): DateRange => {
    return {
        from: getFirstWeekdayOnOrAfterDate(range.from),
        to: getLastWeekdayOnOrBeforeDate(range.to),
    };
};
