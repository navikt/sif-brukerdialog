import { ISOStringToDate } from '@navikt/sif-common-formik-ds';
import { ValidationFunction } from '@navikt/sif-common-formik-ds';
import { DateRange } from '@navikt/sif-common-utils';
import {
    dateCollideWithRanges,
    dateErHelg,
    fraværDagToFraværDateRange,
    fraværPeriodeToDateRange,
    rangeCollideWithRanges,
} from './fraværUtilities';
import { FraværDag, FraværPeriode } from './types';

export enum FraværFieldValidationErrors {
    fravær_timer_mer_enn_arbeidstimer = 'fravær_timer_mer_enn_arbeidstimer',
    fra_og_til_er_ulike_år = 'fra_og_til_er_ulike_år',
    er_helg = 'er_helg',
    fra_dato_kolliderer_med_annet_fravær = 'fra_dato_kolliderer_med_annet_fravær',
    til_dato_kolliderer_med_annet_fravær = 'til_dato_kolliderer_med_annet_fravær',
    dato_kolliderer_med_annet_fravær = 'dato_kolliderer_med_annet_fravær',
    dager_overlapper_med_andre_dager = 'dager_overlapper_med_andre_dager',
}

export const validateLessOrEqualTo =
    (maybeMaxValue: number | undefined): ValidationFunction<any> =>
    (maybeValue: string | undefined) => {
        const maybeValueFloat: number | undefined = maybeValue ? parseFloat(maybeValue) : undefined;
        if (maybeMaxValue && maybeValueFloat) {
            return maybeValueFloat <= maybeMaxValue
                ? undefined
                : FraværFieldValidationErrors.fravær_timer_mer_enn_arbeidstimer;
        }
        return undefined;
    };

export const validateErSammeÅr = (maybeDateFrom: string | undefined, maybeDateTo: string | undefined) => {
    const fromDate = ISOStringToDate(maybeDateFrom);
    const toDate = ISOStringToDate(maybeDateTo);
    if (fromDate && toDate && fromDate.getFullYear() !== toDate.getFullYear()) {
        return FraværFieldValidationErrors.fra_og_til_er_ulike_år;
    }
    return undefined;
};

export const validateNotHelgedag = (maybeDate: string | undefined): FraværFieldValidationErrors | undefined => {
    const date = ISOStringToDate(maybeDate);
    return date && dateErHelg(date) ? FraværFieldValidationErrors.er_helg : undefined;
};

export const validateFraværPeriodeCollision = (
    from: Date | undefined,
    to: Date | undefined,
    ranges: DateRange[] | undefined,
): FraværFieldValidationErrors | undefined => {
    if (!from || !to || (ranges || []).length === 0) {
        return undefined;
    }
    return rangeCollideWithRanges({ from, to }, ranges)
        ? FraværFieldValidationErrors.dager_overlapper_med_andre_dager
        : undefined;
};

export const validateFraOgMedForCollision = (
    date: Date | undefined,
    ranges: DateRange[] | undefined,
): FraværFieldValidationErrors | undefined => {
    if (!date || (ranges || []).length === 0) {
        return undefined;
    }
    return dateCollideWithRanges(date, ranges)
        ? FraværFieldValidationErrors.fra_dato_kolliderer_med_annet_fravær
        : undefined;
};

export const validateTilOgMedForCollision = (
    date: Date | undefined,
    ranges: DateRange[] | undefined,
): FraværFieldValidationErrors | undefined => {
    if (!date || (ranges || []).length === 0) {
        return undefined;
    }
    return dateCollideWithRanges(date, ranges)
        ? FraværFieldValidationErrors.til_dato_kolliderer_med_annet_fravær
        : undefined;
};

export const validateFraværDagCollision = (
    date: Date | undefined,
    ranges: DateRange[] | undefined,
): FraværFieldValidationErrors | undefined => {
    if (!date || (ranges || []).length === 0) {
        return undefined;
    }
    return dateCollideWithRanges(date, ranges)
        ? FraværFieldValidationErrors.dato_kolliderer_med_annet_fravær
        : undefined;
};

export const validateNoCollisions = (
    fraværDager: FraværDag[],
    fraværPerioder: FraværPeriode[],
): FraværFieldValidationErrors.dager_overlapper_med_andre_dager | undefined => {
    if (fraværPerioder.length === 0 && fraværDager.length === 0) {
        return undefined;
    }

    const allFraværDagDateRanges = fraværDager.map(fraværDagToFraværDateRange);
    const allFraværPeriodeDateRanges = fraværPerioder.map(fraværPeriodeToDateRange);

    const hasDateCollision = fraværDager.some((dag) => {
        const rangesWithoutCurrentDag = [
            ...fraværDager.filter((d) => d !== dag).map(fraværDagToFraværDateRange),
            ...allFraværPeriodeDateRanges,
        ];
        return dateCollideWithRanges(dag.dato, rangesWithoutCurrentDag);
    });

    const hasRangeCollision = fraværPerioder.some((periode) => {
        const rangesWithoutCurrentPeriode = [
            ...allFraværDagDateRanges,
            ...fraværPerioder.filter((p) => p !== periode).map(fraværPeriodeToDateRange),
        ];
        return rangeCollideWithRanges(fraværPeriodeToDateRange(periode), rangesWithoutCurrentPeriode);
    });
    return hasDateCollision || hasRangeCollision
        ? FraværFieldValidationErrors.dager_overlapper_med_andre_dager
        : undefined;
};
