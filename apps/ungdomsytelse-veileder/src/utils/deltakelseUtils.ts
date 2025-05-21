import { DateRange, dateRangeUtils } from '@navikt/sif-common-utils';
import { Deltakelse } from '@navikt/ung-common';
import dayjs from 'dayjs';

export const getFørsteMuligeInnmeldingsdato = (
    førsteMuligeInnmeldingsdato: Date,
    tillattEndringsperiode: DateRange,
): Date => {
    return dayjs.max([dayjs(førsteMuligeInnmeldingsdato), dayjs(tillattEndringsperiode.from)]).toDate();
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

/**
 * Henter første og siste dato en deltaker kan meldes inn i programmet
 * @param deltaker
 * @returns
 */
export const getStartdatobegrensningForDeltaker = (
    førsteMuligeInnmeldingsdato: Date,
    sisteMuligeInnmeldingsdato: Date,
    today: Date,
): DateRange | 'fomFørTom' => {
    const tillattEndringsperiode = getTillattEndringsperiode(today);

    const from = getFørsteMuligeInnmeldingsdato(førsteMuligeInnmeldingsdato, tillattEndringsperiode);
    const to = getSisteMuligeInnmeldingsdato(sisteMuligeInnmeldingsdato, tillattEndringsperiode);

    if (dayjs(from).isAfter(to)) {
        return 'fomFørTom';
    }

    return {
        from,
        to,
    };
};
