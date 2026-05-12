import { getRequiredEnv } from '@navikt/sif-common-env';
import { DateRange, dateRangeUtils, getDateToday } from '@navikt/sif-common-utils';
import { DeltakelseHistorikkDto, Endringstype } from '@navikt/ung-deltakelse-opplyser-api-veileder';
import dayjs from 'dayjs';
import { DeltakelseHistorikkInnslag } from '../types';
import { Deltakelse } from '../types/Deltakelse';

/** Antall måneder før og etter i dag som startdato kan endres innenfor */
export const TILLATT_ENDRINGSPERIODE_MÅNEDER = 10;

/** Startdato kan ikke endres når det er færre enn dette antall måneder til kvoteutløp */
export const MAKS_MÅNEDER_FØR_KVOTEUTLØP_FOR_STARTDATOENDRING = 2;

const getEndringsperiode = (today: Date): DateRange => ({
    from: dayjs(today).subtract(TILLATT_ENDRINGSPERIODE_MÅNEDER, 'months').toDate(),
    to: dayjs(today).add(TILLATT_ENDRINGSPERIODE_MÅNEDER, 'months').toDate(),
});

const kvoteErUtløpt = (deltakelse: Deltakelse, today: Date): boolean => {
    return dayjs(deltakelse.kvoteMaksDato).isBefore(today, 'day');
};

const erInnenforSisteMånederFørKvoteutløp = (deltakelse: Deltakelse, today: Date): boolean => {
    return dayjs(today).isSameOrAfter(
        dayjs(deltakelse.kvoteMaksDato).subtract(MAKS_MÅNEDER_FØR_KVOTEUTLØP_FOR_STARTDATOENDRING, 'months'),
        'day',
    );
};

const beregnBrukteDager = (deltakelse: Deltakelse, today: Date = getDateToday()): number => {
    // Henter ut antall ukedager (mandag til fredag) mellom fraOgMed og tilOgMed, eller mellom fraOgMed og i dag hvis tilOgMed ikke er satt
    const start = dayjs(deltakelse.fraOgMed);
    const end = deltakelse.tilOgMed ? dayjs(deltakelse.tilOgMed) : dayjs(today);
    let usedDays = 0;
    let currentDate = start;

    while (currentDate.isSameOrBefore(end, 'day')) {
        if (currentDate.day() !== 0 && currentDate.day() !== 6) {
            usedDays++;
        }
        currentDate = currentDate.add(1, 'day');
    }

    return usedDays;
};

export const kanEndreStartdato = (deltakelse: Deltakelse, today: Date = getDateToday()): boolean => {
    if (deltakelse.harUtvidetKvote) {
        return false;
    }
    if (erInnenforSisteMånederFørKvoteutløp(deltakelse, today)) {
        return false;
    }
    const endringsperiode = getEndringsperiode(today);
    return dateRangeUtils.isDateInDateRange(deltakelse.fraOgMed, endringsperiode);
};

export const kanSetteEllerEndreSluttdato = (deltakelse: Deltakelse, today: Date = getDateToday()): boolean => {
    if (deltakelse.søktTidspunkt === undefined) {
        return false;
    }
    return !kvoteErUtløpt(deltakelse, today);
};

export const kanMeldesUt = (deltakelse: Deltakelse, today: Date = getDateToday()): boolean => {
    return kanSetteEllerEndreSluttdato(deltakelse, today) && deltakelse.tilOgMed === undefined;
};

export const kanEndreSluttdato = (deltakelse: Deltakelse, today: Date = getDateToday()): boolean => {
    return kanSetteEllerEndreSluttdato(deltakelse, today) && deltakelse.tilOgMed !== undefined;
};

export const deltakelseKvoteErUtløpt = (deltakelse: Deltakelse, today: Date = getDateToday()): boolean => {
    return kvoteErUtløpt(deltakelse, today);
};

export const deltakelseSluttdatoErPassert = (deltakelse: Deltakelse, today: Date = getDateToday()): boolean => {
    return deltakelse.tilOgMed ? dayjs(deltakelse.tilOgMed).isBefore(today, 'day') : false;
};

export const deltakelseKanSlettes = (deltakelse: Deltakelse): boolean => {
    return deltakelse.søktTidspunkt === undefined;
};

export const deltakelseKanUtvides = (deltakelse: Deltakelse, today: Date = getDateToday()): boolean => {
    const dagerBrukt = beregnBrukteDager(deltakelse, today);
    if (dagerBrukt < 1) {
        return false;
    }
    return (
        deltakelse.søktTidspunkt !== undefined &&
        deltakelse.tilOgMed === undefined &&
        deltakelse.harUtvidetKvote === false &&
        !erInnenforSisteMånederFørKvoteutløp(deltakelse, today) &&
        !kvoteErUtløpt(deltakelse, today) &&
        !deltakelseSluttdatoErPassert(deltakelse, today)
    );
};

export interface DeltakelseHandlinger {
    kanEndreStartdato: boolean;
    kanMeldesUt: boolean;
    kanEndreSluttdato: boolean;
    kanUtvideKvote: boolean;
    kanSlettes: boolean;
}

export const getDeltakelseHandlinger = (deltakelse: Deltakelse, today: Date = getDateToday()): DeltakelseHandlinger => {
    if (deltakelse.erSlettet) {
        return {
            kanEndreStartdato: false,
            kanMeldesUt: false,
            kanEndreSluttdato: false,
            kanUtvideKvote: false,
            kanSlettes: false,
        };
    }
    return {
        kanEndreStartdato: kanEndreStartdato(deltakelse, today),
        kanMeldesUt: kanMeldesUt(deltakelse, today),
        kanEndreSluttdato: kanEndreSluttdato(deltakelse, today),
        kanUtvideKvote: deltakelseKanUtvides(deltakelse, today),
        kanSlettes: deltakelseKanSlettes(deltakelse),
    };
};

export const TIDLIGSTE_STARTDATO = dayjs('2025-08-01');

export const getGyldigStartdatoRange = (
    deltaker: { førsteMuligeInnmeldingsdato: Date; sisteMuligeInnmeldingsdato: Date },
    today: Date = getDateToday(),
): DateRange | 'fomFørTom' => {
    const endringsperiode = getEndringsperiode(today);

    const from = dayjs
        .max([dayjs(deltaker.førsteMuligeInnmeldingsdato), dayjs(endringsperiode.from), TIDLIGSTE_STARTDATO])
        .toDate();
    const to = dayjs.min([dayjs(deltaker.sisteMuligeInnmeldingsdato), dayjs(endringsperiode.to)]).toDate();

    if (dayjs(from).isAfter(to)) {
        return 'fomFørTom';
    }

    return { from, to };
};

/** @deprecated Bruk getGyldigStartdatoRange i stedet */
export const getStartdatobegrensningForDeltaker = (
    førsteMuligeInnmeldingsdato: Date,
    sisteMuligeInnmeldingsdato: Date,
    today: Date,
): DateRange | 'fomFørTom' => {
    const endringsperiode = getEndringsperiode(today);

    const from = dayjs.max([dayjs(førsteMuligeInnmeldingsdato), dayjs(endringsperiode.from)]).toDate();
    const to = dayjs.min([dayjs(sisteMuligeInnmeldingsdato), dayjs(endringsperiode.to)]).toDate();

    if (dayjs(from).isAfter(to)) {
        return 'fomFørTom';
    }

    return { from, to };
};

/** @deprecated Bruk kanEndreStartdato uten tillattEndringsperiode-parameter */
export const getTillattEndringsperiode = (today: Date): DateRange => getEndringsperiode(today);

export const mapDeltakelseHistorikkTilInnslag = (historikk: DeltakelseHistorikkDto): DeltakelseHistorikkInnslag => {
    return {
        ...historikk,
        tidspunkt: dayjs.utc(historikk.tidspunkt).toDate(),
        aktør: historikk.endringstype === Endringstype.DELTAKER_HAR_SØKT_YTELSE ? 'Deltaker' : historikk.aktør,
    };
};

export const getDeltakelseHistorikkTilInnslag = (historikk: DeltakelseHistorikkDto[]): DeltakelseHistorikkInnslag[] => {
    return historikk
        .map(mapDeltakelseHistorikkTilInnslag)
        .sort((a, b) => b.tidspunkt.getTime() - a.tidspunkt.getTime());
};

export const erÅpnetForRegistrering = (): boolean => {
    if (getRequiredEnv('ENV') !== 'prod') {
        return true; // For testing purposes, always allow registration in non-prod environments
    }
    return dayjs().isSameOrAfter(dayjs('2025-08-11'), 'day');
};

export const addUkedagerToDate = (date: Date, ukedager: number): Date => {
    // Legger til antall ukedager til datoen og hopper over helgedager
    let addedDays = 0;
    let currentDate = dayjs(date);

    while (addedDays < ukedager) {
        currentDate = currentDate.add(1, 'day');
        // Sjekker om det er en ukedag (mandag-fredag)
        if (currentDate.day() !== 0 && currentDate.day() !== 6) {
            addedDays++;
        }
    }

    return currentDate.toDate();
};
