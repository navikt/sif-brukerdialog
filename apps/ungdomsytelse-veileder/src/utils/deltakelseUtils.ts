import { DateRange, dateRangeUtils } from '@navikt/sif-common-utils';
import { Deltakelse } from '@navikt/ung-common';
import { DeltakelseHistorikkDto, Revisjonstype } from '@navikt/ung-deltakelse-opplyser-api';
import dayjs from 'dayjs';
import { DeltakelseHistorikkInnslag } from '../types';
import { UtvidetRevisjonstype } from '../types/UtvidetRevisjonstype';

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
    return deltakelse.søktTidspunkt !== undefined && deltakelse.tilOgMed
        ? dayjs(deltakelse.tilOgMed).isSameOrAfter(tillattEndringsperiode.from, 'day')
        : true;
};

export const kanSletteDeltakelse = (deltakelse: Deltakelse): boolean => {
    return deltakelse.søktTidspunkt === undefined;
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

export const mapDeltakelseHistorikkTilInnslag = (historikk: DeltakelseHistorikkDto): DeltakelseHistorikkInnslag => {
    switch (historikk.revisjonstype) {
        case Revisjonstype.OPPRETTET:
            return {
                tidspunkt: dayjs.utc(historikk.opprettetTidspunkt).toDate(),
                revisjonstype: historikk.revisjonstype,
                utfører: historikk.opprettetAv || 'ukjent',
            };
        case Revisjonstype.ENDRET:
            return {
                tidspunkt: dayjs.utc(historikk.endretTidspunkt).toDate(),
                revisjonstype: historikk.revisjonstype,
                utfører: historikk.endretAv || 'ukjent',
            };
        case Revisjonstype.SLETTET:
            return {
                tidspunkt: dayjs.utc(historikk.endretTidspunkt).toDate(),
                revisjonstype: historikk.revisjonstype,
                utfører: historikk.endretAv || 'ukjent',
            };
        case Revisjonstype.UKJENT:
            return {
                tidspunkt: dayjs.utc(historikk.endretTidspunkt).toDate(),
                revisjonstype: historikk.revisjonstype,
                utfører: historikk.endretAv || 'ukjent',
            };
    }
};

export const getDeltakelseHistorikkTilInnslag = (
    historikk: DeltakelseHistorikkDto[],
    søktTidspunkt: Date | undefined,
): DeltakelseHistorikkInnslag[] => {
    const innslag = historikk
        .map(mapDeltakelseHistorikkTilInnslag)
        .sort((a, b) => b.tidspunkt.getTime() - a.tidspunkt.getTime());

    if (søktTidspunkt === undefined) {
        return innslag;
    }

    /** TODO - hacker til søknad fra deltaker */
    // Finn tinnslag i listen som har deltaker som kilde, og har typen endret periode og tidspunkt som er lik søktTidspunkt.
    const erPotensiellSøknad = (i: DeltakelseHistorikkInnslag): boolean => {
        return (
            i.revisjonstype === UtvidetRevisjonstype.ENDRET &&
            i.utfører.includes('deltaker') &&
            dayjs(i.tidspunkt).isSame(søktTidspunkt, 'day')
        );
    };
    /** Hvis vi har flere treff så gjør vi ikke noe */
    if (innslag.filter(erPotensiellSøknad).length !== 1) {
        return innslag;
    }

    const søknadInnslagIndex = innslag.findIndex(erPotensiellSøknad);
    return innslag.map((i, index) => {
        return index === søknadInnslagIndex && søktTidspunkt
            ? {
                  ...i,
                  revisjonstype: UtvidetRevisjonstype.SØKNAD_INNSENDT,
              }
            : i;
    });
};
