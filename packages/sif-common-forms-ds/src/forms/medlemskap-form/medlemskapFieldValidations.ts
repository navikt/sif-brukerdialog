import { Utenlandsopphold } from '@navikt/sif-common-forms-ds';
import {
    dateRangesCollide,
    dateRangesExceedsRange,
    getDate1YearAgo,
    getDate1YearFromNow,
} from '@navikt/sif-common-utils';
import dayjs from 'dayjs';

export enum MedlemskapFormErrorKeys {
    'utenlandsopphold_ikke_registrert' = 'utenlandsopphold_ikke_registrert',
    'utenlandsopphold_overlapper' = 'utenlandsopphold_overlapper',
    'utenlandsopphold_utenfor_periode' = 'utenlandsopphold_utenfor_periode',
}

export const validateUtenlandsoppholdSiste12Mnd = (utenlandsopphold: Utenlandsopphold[]): string | undefined => {
    if (utenlandsopphold.length === 0) {
        return MedlemskapFormErrorKeys.utenlandsopphold_ikke_registrert;
    }
    const dateRanges = utenlandsopphold.map((u) => ({ from: u.fom, to: u.tom }));
    if (dateRangesCollide(dateRanges)) {
        return MedlemskapFormErrorKeys.utenlandsopphold_overlapper;
    }
    if (dateRangesExceedsRange(dateRanges, { from: getDate1YearAgo(), to: dayjs().subtract(1, 'day').toDate() })) {
        return MedlemskapFormErrorKeys.utenlandsopphold_utenfor_periode;
    }
    return undefined;
};

export const validateUtenlandsoppholdNeste12Mnd = (utenlandsopphold: Utenlandsopphold[]): string | undefined => {
    if (utenlandsopphold.length === 0) {
        return MedlemskapFormErrorKeys.utenlandsopphold_ikke_registrert;
    }
    const dateRanges = utenlandsopphold.map((u) => ({ from: u.fom, to: u.tom }));
    if (dateRangesCollide(dateRanges)) {
        return MedlemskapFormErrorKeys.utenlandsopphold_overlapper;
    }
    if (dateRangesExceedsRange(dateRanges, { from: new Date(), to: getDate1YearFromNow() })) {
        return MedlemskapFormErrorKeys.utenlandsopphold_utenfor_periode;
    }
    return undefined;
};
