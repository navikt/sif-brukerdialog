import {
    dateFormatter,
    DateRange,
    dateRangeUtils,
    dateToISODate,
    getDateRangesFromDates,
    getDatesInDateRange,
    isDateInDateRange,
    isDateWeekDay,
    ISODateToDate,
    sortDateRange,
    sortDates,
} from '@navikt/sif-common-utils';
import { LovbestemtFerieSøknadsdata } from '@types';
import dayjs from 'dayjs';
import { FeriedagMap } from '../søknad/steps/lovbestemt-ferie/LovbestemtFerieStep';
import { getFeriedagerMeta } from './lovbestemtFerieUtils';

export const getFeriedagerIUke = (feriedager: Date[], uke: DateRange, inkluderHelg: boolean): Date[] => {
    const ukedager = getDatesInDateRange(uke).filter((dagIUke) =>
        feriedager.some((dagIFerie) => dayjs(dagIUke).isSame(dagIFerie), 'day'),
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
    liggerISak: boolean,
): FeriedagMap => {
    const feriedager: FeriedagMap = {};
    perioder.sort(sortDateRange).forEach((periode) => {
        getDatesInDateRange(periode)
            .sort(sortDates)
            .forEach((dato) => {
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
        .sort()
        .filter((key) => isDateInDateRange(ISODateToDate(key), periode))
        .forEach((key) => {
            feriedagerIPeriode[key] = feriedager[key];
        });
    return feriedagerIPeriode;
};

export const erFeriedagerEndretIPeriode = (feriedager: FeriedagMap, periode: DateRange): boolean => {
    return getFeriedagerMeta(getFeriedagerIPeriode(feriedager, periode)).erEndret;
};

export const sortFeriedagerMap = (feriedager: FeriedagMap): FeriedagMap => {
    const sorterteFeriedager: FeriedagMap = {};
    Object.keys(feriedager)
        .sort()
        .forEach((key) => (sorterteFeriedager[key] = feriedager[key]));
    return sorterteFeriedager;
};

export const harFjernetFerieIPeriode = (lovbestemtFerie: LovbestemtFerieSøknadsdata, periode: DateRange): boolean => {
    if (lovbestemtFerie?.feriedagerMeta.perioderFjernet) {
        return dateRangeUtils.dateRangesCollide([periode, ...(lovbestemtFerie?.feriedagerMeta.perioderFjernet ?? [])]);
    }
    return false;
};
