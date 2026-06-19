import { getRequiredEnv } from '@navikt/sif-common-env';
import { DateRange, dateRangeUtils, getDateToday, ISODateToDate } from '@navikt/sif-common-utils';
import { DeltakelseHistorikkDto, Endringstype } from '@navikt/ung-deltakelse-opplyser-api-veileder';
import dayjs from 'dayjs';
import { DeltakelseHistorikkInnslag } from '../types';
import { Deltakelse } from '../types/Deltakelse';
import { Features } from '../types/Features';

/** Antall måneder før og etter i dag som startdato kan endres innenfor */
export const TILLATT_ENDRINGSPERIODE_MÅNEDER = 10;

/** Startdato kan ikke endres når det er færre måneder enn dette til perioden er ferdig */
export const MÅNEDER_FØR_PERIODESLUTT_ÅPEN_FOR_FORLENGELSE = 2;

const getEndringsperiode = (today: Date): DateRange => ({
    from: dayjs(today).subtract(TILLATT_ENDRINGSPERIODE_MÅNEDER, 'months').toDate(),
    to: dayjs(today).add(TILLATT_ENDRINGSPERIODE_MÅNEDER, 'months').toDate(),
});

const periodeErUtløpt = (deltakelse: Deltakelse, today: Date): boolean => {
    return dayjs(deltakelse.periodeMaksDato).isBefore(today, 'day');
};

const erInnenforSisteMånederFørPeriodeslutt = (deltakelse: Deltakelse, today: Date): boolean => {
    return dayjs(today).isSameOrAfter(
        dayjs(deltakelse.periodeMaksDato).subtract(MÅNEDER_FØR_PERIODESLUTT_ÅPEN_FOR_FORLENGELSE, 'months'),
        'day',
    );
};

const erInnenforSiste6UkerEtterPeriodeslutt = (deltakelse: Deltakelse, today: Date): boolean => {
    return (
        dayjs(today).isSameOrAfter(dayjs(deltakelse.periodeMaksDato), 'day') &&
        dayjs(today).isBefore(dayjs(deltakelse.periodeMaksDato).add(6, 'weeks'), 'day')
    );
};

export const kanEndreStartdato = (deltakelse: Deltakelse, today: Date = getDateToday()): boolean => {
    if (deltakelse.harForlengetPeriode) {
        return false;
    }
    if (erInnenforSisteMånederFørPeriodeslutt(deltakelse, today)) {
        return false;
    }
    const endringsperiode = getEndringsperiode(today);
    return dateRangeUtils.isDateInDateRange(deltakelse.fraOgMed, endringsperiode);
};

export const kanSetteEllerEndreSluttdato = (deltakelse: Deltakelse, today: Date = getDateToday()): boolean => {
    if (deltakelse.søktTidspunkt === undefined) {
        return false;
    }
    return !periodeErUtløpt(deltakelse, today);
};

export const kanMeldesUt = (deltakelse: Deltakelse, today: Date = getDateToday()): boolean => {
    return kanSetteEllerEndreSluttdato(deltakelse, today) && deltakelse.tilOgMed === undefined;
};

export const kanEndreSluttdato = (deltakelse: Deltakelse, today: Date = getDateToday()): boolean => {
    return kanSetteEllerEndreSluttdato(deltakelse, today) && deltakelse.tilOgMed !== undefined;
};
export const kanSletteSluttdato = (deltakelse: Deltakelse, today: Date = getDateToday()): boolean => {
    return Features.slettSluttdato && kanEndreSluttdato(deltakelse, today);
};

export const deltakelsePeriodeErUtløpt = (deltakelse: Deltakelse, today: Date = getDateToday()): boolean => {
    return periodeErUtløpt(deltakelse, today);
};

export const deltakelseSluttdatoErIDagEllerFremover = (
    deltakelse: Deltakelse,
    today: Date = getDateToday(),
): boolean => {
    return deltakelse.tilOgMed ? dayjs(deltakelse.tilOgMed).isSameOrAfter(today, 'day') : false;
};

export const deltakelseKanSlettes = (deltakelse: Deltakelse): boolean => {
    return deltakelse.søktTidspunkt === undefined;
};

export const periodeKanForlenges = (deltakelse: Deltakelse, today: Date = getDateToday()): boolean => {
    if (!deltakelse.søktTidspunkt) return false;
    if (deltakelse.harForlengetPeriode) return false;
    if (deltakelse.tilOgMed !== undefined) return false;
    if (periodeErUtløpt(deltakelse, today)) {
        return erInnenforSiste6UkerEtterPeriodeslutt(deltakelse, today);
    }
    return erInnenforSisteMånederFørPeriodeslutt(deltakelse, today);
};

export interface DeltakelseHandlinger {
    kanEndreStartdato: boolean;
    kanMeldesUt: boolean;
    kanEndreSluttdato: boolean;
    kanSletteSluttdato: boolean;
    kanForlengePeriode: boolean;
    kanSlettes: boolean;
}

export const getDeltakelseHandlinger = (deltakelse: Deltakelse, today: Date = getDateToday()): DeltakelseHandlinger => {
    if (deltakelse.erSlettet) {
        return {
            kanEndreStartdato: false,
            kanMeldesUt: false,
            kanEndreSluttdato: false,
            kanSletteSluttdato: false,
            kanForlengePeriode: false,
            kanSlettes: false,
        };
    }
    return {
        kanEndreStartdato: kanEndreStartdato(deltakelse, today),
        kanMeldesUt: kanMeldesUt(deltakelse, today),
        kanEndreSluttdato: kanEndreSluttdato(deltakelse, today),
        kanSletteSluttdato: kanSletteSluttdato(deltakelse, today),
        kanForlengePeriode: periodeKanForlenges(deltakelse, today),
        kanSlettes: deltakelseKanSlettes(deltakelse),
    };
};

const DEV_TIDLIGSTE_STARTDATO = ISODateToDate('2025-01-01');
const PROD_TIDLIGSTE_STARTDATO = ISODateToDate('2025-08-01');

export const getGyldigStartdatoRange = (
    deltaker: { førsteMuligeInnmeldingsdato: Date; sisteMuligeInnmeldingsdato: Date },
    today: Date = getDateToday(),
): DateRange | 'fomFørTom' => {
    const endringsperiode = getEndringsperiode(today);

    const from = Features.tillatTidligInnmelding
        ? dayjs.max([dayjs(deltaker.førsteMuligeInnmeldingsdato), dayjs(DEV_TIDLIGSTE_STARTDATO)]).toDate()
        : dayjs
              .max([
                  dayjs(deltaker.førsteMuligeInnmeldingsdato),
                  dayjs(endringsperiode.from),
                  dayjs(PROD_TIDLIGSTE_STARTDATO),
              ])
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
