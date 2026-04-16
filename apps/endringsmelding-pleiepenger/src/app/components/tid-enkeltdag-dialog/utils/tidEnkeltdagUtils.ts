import {
    DateDurationMap,
    DateRange,
    dateToISODate,
    Duration,
    getDatesInDateRange,
    getFirstWeekdayOnOrAfterDate,
    getLastWeekdayOnOrBeforeDate,
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

const getGjentagendeDager = (
    søknadsperiode: DateRange,
    endringsperiodeIMåned: DateRange,
    dato: Date,
    gjentagelse?: GjentagelseEnkeltdag,
): ISODate[] => {
    if (!gjentagelse) {
        return [dateToISODate(dato)];
    }

    let dager: Date[];

    switch (gjentagelse.gjentagelsetype) {
        case GjentagelseType.sammeDagUtMånedFom:
        case GjentagelseType.sammeDagUtSøknadsperiodenFom:
            dager = getDagerMedInterval(1, { from: dato, to: søknadsperiode.to });
            break;
        case GjentagelseType.heleUken: {
            const uke = getWeekDateRange(dato, true);
            dager = getDatesInDateRange(
                {
                    from: dayjs.max(dayjs(uke.from), dayjs(endringsperiodeIMåned.from))!.toDate(),
                    to: dayjs.min(dayjs(uke.to), dayjs(endringsperiodeIMåned.to))!.toDate(),
                },
                true,
            );
            break;
        }
        case GjentagelseType.heleMåneden:
            dager = getDatesInDateRange(endringsperiodeIMåned, true);
            break;
        case GjentagelseType.alleDagerUtSøknadsperioden:
            dager = getDatesInDateRange({ from: dato, to: søknadsperiode.to }, true);
            break;
        default:
            dager = [];
    }

    return dager.filter(isDateWeekDay).map(dateToISODate);
};

export const getDagerMedNyTid = (
    /** Hele søknadsperioden */
    søknadsperiode: DateRange,
    /** Endringsperioden */
    endringsperiode: DateRange,
    /** Datoen som skal endres/bruker har valgt */
    valgtDato: Date,
    /** Varighet for endringen */
    varighet: Duration,
    /** Gjentagelse for endringen */
    gjentagelse?: GjentagelseEnkeltdag,
): DateDurationMap => {
    const datoerMedTid: DateDurationMap = {};
    const datoerSomSkalEndres = getGjentagendeDager(søknadsperiode, endringsperiode, valgtDato, gjentagelse);
    datoerSomSkalEndres.forEach((isoDate) => {
        datoerMedTid[isoDate] = { ...varighet };
    });
    datoerMedTid[dateToISODate(valgtDato)] = { ...varighet };
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
