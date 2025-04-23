import { DateRange } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';

/**
 * Henter gyldig periode for startdato for deltaker.
 * @param deltaker
 * @returns
 */
export const getStartdatobegrensningForDeltaker = (
    førsteMuligeInnmeldingsdato: Date,
    sisteMuligeInnmeldingsdato: Date,
    programperiodeStart: Date,
    today: Date,
): DateRange | 'fomFørTom' => {
    const from = getFørsteMuligeInnmeldingsdato(førsteMuligeInnmeldingsdato, programperiodeStart, today);
    const to = getSisteMuligeInnmeldingsdato(sisteMuligeInnmeldingsdato, today);

    if (dayjs(from).isAfter(to)) {
        return 'fomFørTom';
    }

    return {
        from,
        to,
    };
};

export const getFørsteMuligeInnmeldingsdato = (
    førsteMuligeInnmeldingsdato: Date,
    programperiodeStart: Date,
    today: Date,
): Date => {
    const todayJs = dayjs(today);
    return dayjs
        .max([dayjs(programperiodeStart), dayjs(førsteMuligeInnmeldingsdato), todayJs.subtract(6, 'months')])
        .toDate();
};

export const getSisteMuligeInnmeldingsdato = (sisteMuligeInnmeldingsdato: Date, today: Date): Date => {
    const todayJs = dayjs(today);
    return dayjs.min([dayjs(sisteMuligeInnmeldingsdato), todayJs.add(6, 'months')]).toDate();
};
