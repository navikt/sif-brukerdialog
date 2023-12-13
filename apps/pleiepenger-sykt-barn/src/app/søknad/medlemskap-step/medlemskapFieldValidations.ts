import { date1YearAgo, date1YearFromNow, dateRangesCollide, dateRangesExceedsRange } from '@navikt/sif-common-utils';
import { Utenlandsopphold } from '@navikt/sif-common-forms-ds/src';
import dayjs from 'dayjs';

enum UtenlandsoppholdErrors {
    'utenlandsopphold_ikke_registrert' = 'utenlandsopphold_ikke_registrert',
    'utenlandsopphold_overlapper' = 'utenlandsopphold_overlapper',
    'utenlandsopphold_utenfor_periode' = 'utenlandsopphold_utenfor_periode',
}

export const validateUtenlandsoppholdSiste12Mnd = (utenlandsopphold: Utenlandsopphold[]): string | undefined => {
    if (utenlandsopphold.length === 0) {
        return UtenlandsoppholdErrors.utenlandsopphold_ikke_registrert;
    }
    const dateRanges = utenlandsopphold.map((u) => ({ from: u.fom, to: u.tom }));
    if (dateRangesCollide(dateRanges)) {
        return UtenlandsoppholdErrors.utenlandsopphold_overlapper;
    }
    if (dateRangesExceedsRange(dateRanges, { from: date1YearAgo, to: dayjs().subtract(1, 'day').toDate() })) {
        return UtenlandsoppholdErrors.utenlandsopphold_utenfor_periode;
    }
    return undefined;
};

export const validateUtenlandsoppholdNeste12Mnd = (utenlandsopphold: Utenlandsopphold[]): string | undefined => {
    if (utenlandsopphold.length === 0) {
        return UtenlandsoppholdErrors.utenlandsopphold_ikke_registrert;
    }
    const dateRanges = utenlandsopphold.map((u) => ({ from: u.fom, to: u.tom }));
    if (dateRangesCollide(dateRanges)) {
        return UtenlandsoppholdErrors.utenlandsopphold_overlapper;
    }
    if (dateRangesExceedsRange(dateRanges, { from: new Date(), to: date1YearFromNow })) {
        return UtenlandsoppholdErrors.utenlandsopphold_utenfor_periode;
    }
    return undefined;
};
