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
    isDateInDateRange,
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

const getPeriodeForGjentageneEndring = (
    from: Date,
    søknadsperiode: DateRange,
    endringsperiodeIMåned: DateRange,
    gjentagelsetype: GjentagelseType,
): DateRange => {
    switch (gjentagelsetype) {
        case GjentagelseType.heleMåneden:
            return endringsperiodeIMåned;
        case GjentagelseType.likDagHeleSøknadsperioden:
        case GjentagelseType.alleDagerUtSøknadsperioden:
            return { from, to: søknadsperiode.to };
        default:
            return { from, to: endringsperiodeIMåned.to };
    }
};

const getGjentagendeDager = (
    søknadsperiode: DateRange,
    endringsperiodeIMåned: DateRange,
    dato: Date,
    gjentagelse?: GjentagelseEnkeltdag,
): ISODate[] => {
    if (gjentagelse) {
        let gjentagendeDatoer: Date[] = [];
        const periode = getPeriodeForGjentageneEndring(
            dato,
            søknadsperiode,
            endringsperiodeIMåned,
            gjentagelse.gjentagelsetype,
        );

        switch (gjentagelse.gjentagelsetype) {
            case GjentagelseType.hverUke:
            case GjentagelseType.likDagHeleSøknadsperioden:
                gjentagendeDatoer = getDagerMedInterval(1, periode);
                break;
            case GjentagelseType.heleUken:
                gjentagendeDatoer = getDatesInDateRange(getWeekDateRange(periode.from, true), true);
                break;
            case GjentagelseType.heleMåneden:
                gjentagendeDatoer = getDatesInDateRange(getMonthDateRange(periode.from), true);
                break;
            case GjentagelseType.alleDagerUtSøknadsperioden:
                gjentagendeDatoer = getDatesInDateRange(periode, true);
                break;
        }
        return gjentagendeDatoer
            .filter(isDateWeekDay)
            .filter((d) => isDateInDateRange(d, periode))
            .map((date) => dateToISODate(date));
    }
    return [dateToISODate(dato)];
};

export const getDagerMedNyTid = (
    søknadsperiode: DateRange,
    endringsperiode: DateRange,
    dato: Date,
    varighet: Duration,
    gjentagelse?: GjentagelseEnkeltdag,
): DateDurationMap => {
    const datoerMedTid: DateDurationMap = {};
    const datoerSomSkalEndres = getGjentagendeDager(søknadsperiode, endringsperiode, dato, gjentagelse);
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
