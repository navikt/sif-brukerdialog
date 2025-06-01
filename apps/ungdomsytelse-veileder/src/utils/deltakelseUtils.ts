import { DateRange, dateRangeUtils } from '@navikt/sif-common-utils';
import { Deltakelse } from '@navikt/ung-common';
import { DeltakelseHistorikkDto, Revisjonstype } from '@navikt/ung-deltakelse-opplyser-api';
import dayjs from 'dayjs';
import { DeltakelseHistorikkInnslag } from '../types';

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

export const getDeltakelseHistorikkTilInnslag = (historikk: DeltakelseHistorikkDto[]): DeltakelseHistorikkInnslag[] => {
    return historikk
        .map(mapDeltakelseHistorikkTilInnslag)
        .sort((a, b) => b.tidspunkt.getTime() - a.tidspunkt.getTime());
};
