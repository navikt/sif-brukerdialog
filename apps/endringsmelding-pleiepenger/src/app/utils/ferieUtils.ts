import {
    dateFormatter,
    DateRange,
    dateToISODate,
    getDateRangesFromDates,
    getDatesInDateRange,
    getDatesInDateRanges,
    isDateInDateRange,
    isDateWeekDay,
    ISODateToDate,
} from '@navikt/sif-common-utils/lib';
import dayjs from 'dayjs';
import { Feriedag, FeriedagMap } from '../søknad/steps/lovbestemt-ferie/LovbestemtFerieStep';

export const getFeriedagerIUke = (ferieperioder: DateRange[], uke: DateRange, inkluderHelg: boolean): Date[] => {
    const feriedager = getDatesInDateRanges(ferieperioder);
    const ukedager = getDatesInDateRange(uke).filter((dagIUke) =>
        feriedager.some((dagIFerie) => dayjs(dagIUke).isSame(dagIFerie), 'day')
    );
    if (inkluderHelg === false) {
        return ukedager.filter(isDateWeekDay);
    }
    return ukedager;
};

const getSammenhengendeDagerTekst = (dager: Date[]) => {
    if (dager.length === 1) {
        return dateFormatter.day(dager[0]);
    }
    if (dager.length === 2) {
        return `${dateFormatter.day(dager[0])}, ${dateFormatter.day(dager[1])}`;
    }
    return `${dateFormatter.day(dager[0])} - ${dateFormatter.day(dager[dager.length - 1])}`;
};

export const getFeriedagerIUkeTekst = (dager: Date[]) => {
    const perioder = getDateRangesFromDates(dager);
    if (perioder.length === 1) {
        getSammenhengendeDagerTekst(dager);
    }
    return perioder
        .map((periode) => {
            return getSammenhengendeDagerTekst(getDatesInDateRange(periode));
        })
        .join(', ');
};

export const getFeriedagerMapFromPerioder = (
    perioder: DateRange[],
    skalHaFerie: boolean,
    liggerISak: boolean
): FeriedagMap => {
    const feriedager: FeriedagMap = {};
    perioder.forEach((periode) => {
        getDatesInDateRange(periode).forEach((dato) => {
            feriedager[dateToISODate(dato)] = {
                dato,
                skalHaFerie,
                liggerISak,
            };
        });
    });
    return feriedager;
};

export const getFeriedagerIPeriode = (feriedager: FeriedagMap, periode: DateRange): FeriedagMap => {
    const feriedagerIPeriode: FeriedagMap = {};
    Object.keys(feriedager)
        .filter((key) => isDateInDateRange(ISODateToDate(key), periode))
        .forEach((key) => {
            feriedagerIPeriode[key] = feriedager[key];
        });
    return feriedagerIPeriode;
};

export const getFeriedagerFraFeriedagMap = (feriedager: FeriedagMap): Feriedag[] => {
    return Object.keys(feriedager).map((key) => feriedager[key]);
};
