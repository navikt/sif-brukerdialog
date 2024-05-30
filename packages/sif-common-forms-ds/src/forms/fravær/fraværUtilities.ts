import { dateToISOString, ISOStringToDate } from '@navikt/sif-common-formik-ds';
import { DateRange, guid } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { isString } from 'formik';
import { FraværDag, FraværDagFormValues, FraværPeriode, FraværPeriodeFormValues } from './types';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export const isFraværDag = (fraværDag: Partial<FraværDag>): fraværDag is FraværDag => {
    return (
        fraværDag.dato !== undefined && fraværDag.timerArbeidsdag !== undefined && fraværDag.timerFravær !== undefined
    );
};

export const isFraværPeriode = (fraværPeriode: Partial<FraværPeriode>): fraværPeriode is FraværPeriode => {
    return fraværPeriode.fraOgMed !== undefined && fraværPeriode.tilOgMed !== undefined;
};

export const fraværDagToFraværDateRange = (fraværDag: FraværDag): DateRange => ({
    from: fraværDag.dato,
    to: fraværDag.dato,
});

export const fraværPeriodeToDateRange = (fraværDag: FraværPeriode): DateRange => ({
    from: fraværDag.fraOgMed,
    to: fraværDag.tilOgMed,
});

export enum Weekday {
    monday = 'monday',
    tuesday = 'tuesday',
    wednesday = 'wednesday',
    thursday = 'thursday',
    friday = 'friday',
    saturday = 'saturday',
    sunday = 'sunday',
}

export const getWeekdayName = (date: Date): Weekday | undefined => {
    switch (date.getDay()) {
        case 0:
            return Weekday.sunday;
        case 1:
            return Weekday.monday;
        case 2:
            return Weekday.tuesday;
        case 3:
            return Weekday.wednesday;
        case 4:
            return Weekday.thursday;
        case 5:
            return Weekday.friday;
        case 6:
            return Weekday.saturday;
        default:
            return undefined;
    }
};

export const dateErHelg = (date: Date) =>
    getWeekdayName(date) === Weekday.saturday || getWeekdayName(date) === Weekday.sunday;

export const rangeCollideWithRanges = (range: DateRange, ranges: DateRange[] = []): boolean => {
    if (!range || !range.from || !range.to || ranges.length === 0) {
        return false;
    }
    return ranges.some((periode) => {
        const fromDay = dayjs(range.from);
        const toDay = dayjs(range.to);
        const { from, to } = periode;
        if (fromDay.isBefore(from) && toDay.isAfter(to)) return true;
        if (fromDay.isSameOrAfter(from, 'day') && fromDay.isSameOrBefore(to, 'day')) return true;
        if (toDay.isSameOrAfter(from, 'day') && toDay.isSameOrBefore(to, 'day')) return true;
    });
};

export const dateCollideWithRanges = (date: Date | undefined, ranges: DateRange[] = []): boolean => {
    if (!date || ranges.length === 0) {
        return false;
    }
    return ranges.some((range) => {
        return dayjs(date).isSameOrAfter(range.from, 'day') && dayjs(date).isSameOrBefore(range.to, 'day');
    });
};

export const dateRangeToFomTom = (dateRange: DateRange): { fom: Date; tom: Date } => ({
    fom: dateRange.from,
    tom: dateRange.to,
});
export const toMaybeNumber = (timerArbeidsdag: string | undefined): number | undefined => {
    if (timerArbeidsdag && isString(timerArbeidsdag)) {
        return parseFloat(timerArbeidsdag);
    }
    return undefined;
};

export const mapFormValuesToFraværDag = (
    formValues: FraværDagFormValues,
    id: string | undefined,
): Partial<FraværDag> => {
    return {
        id: id || guid(),
        timerArbeidsdag: formValues.timerArbeidsdag,
        timerFravær: formValues.timerFravær,
        dato: ISOStringToDate(formValues.dato),
    };
};

export const mapFraværDagToFormValues = (fraværDag: Partial<FraværDag>): FraværDagFormValues => {
    return {
        timerArbeidsdag: fraværDag.timerArbeidsdag,
        timerFravær: fraværDag.timerFravær,
        dato: fraværDag.dato ? dateToISOString(fraværDag.dato) : '',
    };
};

export const mapFormValuesToFraværPeriode = (
    formValues: FraværPeriodeFormValues,
    id: string | undefined,
): Partial<FraværPeriode> => {
    return {
        id: id || guid(),
        fraOgMed: ISOStringToDate(formValues.fraOgMed),
        tilOgMed: ISOStringToDate(formValues.tilOgMed),
    };
};

export const mapFraværPeriodeToFormValues = (fraværPeriode: Partial<FraværPeriode>): FraværPeriodeFormValues => {
    return {
        fraOgMed: fraværPeriode.fraOgMed ? dateToISOString(fraværPeriode.fraOgMed) : '',
        tilOgMed: fraværPeriode.tilOgMed ? dateToISOString(fraværPeriode.tilOgMed) : '',
    };
};
