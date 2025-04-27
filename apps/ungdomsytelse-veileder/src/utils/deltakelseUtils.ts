import { DateRange, dateRangeUtils } from '@navikt/sif-common-utils';
import { Deltakelse } from '@navikt/ung-common';
import dayjs from 'dayjs';

/**
 * Henter første og siste dato en deltaker kan meldes inn i programmet
 * @param deltaker
 * @returns
 */
export const getStartdatobegrensningForDeltaker = (
    førsteMuligeInnmeldingsdato: Date,
    sisteMuligeInnmeldingsdato: Date,
    programperiodeStart: Date,
    today: Date,
): DateRange | 'fomFørTom' => {
    const tillattEndringsperiode = getTillattEndringsperiode(today);

    const from = getFørsteMuligeInnmeldingsdato(
        førsteMuligeInnmeldingsdato,
        programperiodeStart,
        tillattEndringsperiode,
    );
    const to = getSisteMuligeInnmeldingsdato(sisteMuligeInnmeldingsdato, tillattEndringsperiode);

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
    tillattEndringsperiode: DateRange,
): Date => {
    return dayjs
        .max([dayjs(programperiodeStart), dayjs(førsteMuligeInnmeldingsdato), dayjs(tillattEndringsperiode.from)])
        .toDate();
};

/** Tillat periode for endring basert på dagens dato. 6 måned før og etter dagens dato. */
export const getTillattEndringsperiode = (today: Date): DateRange => ({
    from: dayjs(today).subtract(6, 'months').toDate(),
    to: dayjs(today).add(6, 'months').toDate(),
});

export const getSisteMuligeInnmeldingsdato = (
    sisteMuligeInnmeldingsdato: Date,
    tillattEndringsperiode: DateRange,
): Date => {
    return dayjs.min([dayjs(sisteMuligeInnmeldingsdato), dayjs(tillattEndringsperiode.to)]).toDate();
};

export const kanEndreStartdato = (deltakelse: Deltakelse, tillattEndringsperiode: DateRange): boolean => {
    return dateRangeUtils.isDateInDateRange(deltakelse.fraOgMed, tillattEndringsperiode);
};

export const kanEndreSluttdato = (deltakelse: Deltakelse, tillattEndringsperiode: DateRange): boolean => {
    return deltakelse.harSøkt && deltakelse.tilOgMed
        ? dateRangeUtils.isDateInDateRange(deltakelse.tilOgMed, tillattEndringsperiode)
        : true;
};

export const kanSletteDeltakelse = (deltakelse: Deltakelse): boolean => {
    return !deltakelse.harSøkt;
};

export const isValidUUID = (uuid: string): boolean => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
};
