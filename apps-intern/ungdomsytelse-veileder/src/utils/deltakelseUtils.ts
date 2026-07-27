import { getRequiredEnv } from '@navikt/sif-common-env';
import { DateRange, dateRangeUtils, getDateToday, ISODateToDate } from '@navikt/sif-common-utils';
import { DeltakelseHistorikkDto, Endringstype } from '@navikt/ung-deltakelse-opplyser-api-veileder';
import dayjs from 'dayjs';
import { DeltakelseHistorikkInnslag } from '../types';
import { Deltakelse } from '../types/Deltakelse';
import { Features } from '../types/Features';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

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

export const erInnenforSisteMånederFørPeriodeslutt = (deltakelse: Deltakelse, today: Date): boolean => {
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

export type HandlingsResultat = { resultat: boolean; årsak: string };

export enum PeriodeKanForlengesÅrsak {
    JA = 'JA',
    DELTAKELSE_ER_SLETTET = 'DELTAKELSE_ER_SLETTET',
    HAR_IKKE_SØKT_TIDSPUNKT = 'HAR_IKKE_SØKT_TIDSPUNKT',
    PERIODEN_ER_ALLEREDE_FORLENGET = 'PERIODEN_ER_ALLEREDE_FORLENGET',
    SLUTTDATO_ER_SATT = 'SLUTTDATO_ER_SATT',
    UTENFOR_FORLENGELSESVINDUET = 'UTENFOR_FORLENGELSESVINDUET',
    IKKE_INNENFOR_SISTE_MÅNEDER_FØR_PERIODESLUTT = 'IKKE_INNENFOR_SISTE_MÅNEDER_FØR_PERIODESLUTT',
}

export type PeriodeKanForlengesResultat = HandlingsResultat & { årsakskode: PeriodeKanForlengesÅrsak };

const ok = (): HandlingsResultat => ({ resultat: true, årsak: '' });
const nei = (årsak: string): HandlingsResultat => ({ resultat: false, årsak });
const okForlengePeriode = (årsakskode: PeriodeKanForlengesÅrsak): PeriodeKanForlengesResultat => ({
    resultat: true,
    årsak: '',
    årsakskode,
});
const neiForlengePeriode = (årsak: string, årsakskode: PeriodeKanForlengesÅrsak): PeriodeKanForlengesResultat => ({
    resultat: false,
    årsak,
    årsakskode,
});

const kanEndreStartdatoResultat = (deltakelse: Deltakelse, today: Date): HandlingsResultat => {
    if (deltakelse.harForlengetPeriode) {
        return nei('Perioden er allerede forlenget');
    }
    if (erInnenforSisteMånederFørPeriodeslutt(deltakelse, today)) {
        return nei('Innenfor siste måneder før periodeslutt');
    }
    const endringsperiode = getEndringsperiode(today);
    if (!dateRangeUtils.isDateInDateRange(deltakelse.fraOgMed, endringsperiode)) {
        return nei('Startdato er utenfor tillatt endringsperiode');
    }
    return ok();
};

const kanSetteEllerEndreSluttdatoResultat = (deltakelse: Deltakelse, today: Date): HandlingsResultat => {
    if (deltakelse.søktTidspunkt === undefined) {
        return nei('Deltakelsen har ikke søkt tidspunkt');
    }
    if (periodeErUtløpt(deltakelse, today)) {
        return nei('Perioden er utløpt');
    }
    return ok();
};

const kanMeldesUtResultat = (deltakelse: Deltakelse, today: Date): HandlingsResultat => {
    const base = kanSetteEllerEndreSluttdatoResultat(deltakelse, today);
    if (!base.resultat) return base;
    if (deltakelse.tilOgMed !== undefined) {
        return nei('Sluttdato er allerede satt');
    }
    return ok();
};

const kanEndreSluttdatoResultat = (deltakelse: Deltakelse, today: Date): HandlingsResultat => {
    const base = kanSetteEllerEndreSluttdatoResultat(deltakelse, today);
    if (!base.resultat) return base;
    if (deltakelse.tilOgMed === undefined) {
        return nei('Sluttdato er ikke satt');
    }
    return ok();
};

const kanSletteSluttdatoResultat = (deltakelse: Deltakelse, today: Date): HandlingsResultat => {
    if (!Features.slettSluttdato) {
        return nei('Funksjonalitet ikke aktivert');
    }
    return kanEndreSluttdatoResultat(deltakelse, today);
};

const periodeKanForlengesResultat = (deltakelse: Deltakelse, today: Date): PeriodeKanForlengesResultat => {
    if (!deltakelse.søktTidspunkt)
        return neiForlengePeriode(
            'Deltakelsen har ikke søkt tidspunkt',
            PeriodeKanForlengesÅrsak.HAR_IKKE_SØKT_TIDSPUNKT,
        );
    if (deltakelse.harForlengetPeriode)
        return neiForlengePeriode(
            'Perioden er allerede forlenget',
            PeriodeKanForlengesÅrsak.PERIODEN_ER_ALLEREDE_FORLENGET,
        );
    if (deltakelse.tilOgMed !== undefined)
        return neiForlengePeriode('Sluttdato er satt', PeriodeKanForlengesÅrsak.SLUTTDATO_ER_SATT);
    if (periodeErUtløpt(deltakelse, today)) {
        if (!erInnenforSiste6UkerEtterPeriodeslutt(deltakelse, today)) {
            return neiForlengePeriode(
                'Perioden er utløpt og utenfor 6-ukersvinduet for forlengelse',
                PeriodeKanForlengesÅrsak.UTENFOR_FORLENGELSESVINDUET,
            );
        }
        return okForlengePeriode(PeriodeKanForlengesÅrsak.JA);
    }
    if (!erInnenforSisteMånederFørPeriodeslutt(deltakelse, today)) {
        return neiForlengePeriode(
            'Ikke innenfor siste måneder før periodeslutt',
            PeriodeKanForlengesÅrsak.IKKE_INNENFOR_SISTE_MÅNEDER_FØR_PERIODESLUTT,
        );
    }
    return okForlengePeriode(PeriodeKanForlengesÅrsak.JA);
};

const deltakelseKanSlettesResultat = (deltakelse: Deltakelse): HandlingsResultat => {
    if (deltakelse.søktTidspunkt !== undefined) {
        return nei('Deltakelsen har søkt tidspunkt');
    }
    return ok();
};

export const kanEndreStartdato = (deltakelse: Deltakelse, today: Date = getDateToday()): boolean =>
    kanEndreStartdatoResultat(deltakelse, today).resultat;

export const kanSetteEllerEndreSluttdato = (deltakelse: Deltakelse, today: Date = getDateToday()): boolean =>
    kanSetteEllerEndreSluttdatoResultat(deltakelse, today).resultat;

export const kanMeldesUt = (deltakelse: Deltakelse, today: Date = getDateToday()): boolean =>
    kanMeldesUtResultat(deltakelse, today).resultat;

export const kanEndreSluttdato = (deltakelse: Deltakelse, today: Date = getDateToday()): boolean =>
    kanEndreSluttdatoResultat(deltakelse, today).resultat;

export const deltakelsePeriodeErUtløpt = (deltakelse: Deltakelse, today: Date = getDateToday()): boolean =>
    periodeErUtløpt(deltakelse, today);

export const deltakelseSluttdatoErIDagEllerFremover = (
    deltakelse: Deltakelse,
    today: Date = getDateToday(),
): boolean => {
    return deltakelse.tilOgMed ? dayjs(deltakelse.tilOgMed).isSameOrAfter(today, 'day') : false;
};

export const deltakelseKanSlettes = (deltakelse: Deltakelse): boolean =>
    deltakelseKanSlettesResultat(deltakelse).resultat;

export const kanSletteSluttdato = (deltakelse: Deltakelse, today: Date = getDateToday()): boolean =>
    kanSletteSluttdatoResultat(deltakelse, today).resultat;

export const periodeKanForlenges = (deltakelse: Deltakelse, today: Date = getDateToday()): boolean =>
    periodeKanForlengesResultat(deltakelse, today).resultat;

export interface DeltakelseHandlinger {
    kanEndreStartdato: HandlingsResultat;
    kanMeldesUt: HandlingsResultat;
    kanEndreSluttdato: HandlingsResultat;
    kanSletteSluttdato: HandlingsResultat;
    kanForlengePeriode: PeriodeKanForlengesResultat;
    kanSletteDeltakelse: HandlingsResultat;
}

export const getDeltakelseHandlinger = (deltakelse: Deltakelse, today: Date = getDateToday()): DeltakelseHandlinger => {
    if (deltakelse.erSlettet) {
        return {
            kanEndreStartdato: nei('Deltakelsen er slettet'),
            kanMeldesUt: nei('Deltakelsen er slettet'),
            kanEndreSluttdato: nei('Deltakelsen er slettet'),
            kanSletteSluttdato: nei('Deltakelsen er slettet'),
            kanForlengePeriode: neiForlengePeriode(
                'Deltakelsen er slettet',
                PeriodeKanForlengesÅrsak.DELTAKELSE_ER_SLETTET,
            ),
            kanSletteDeltakelse: nei('Deltakelsen er slettet'),
        };
    }
    return {
        kanEndreStartdato: kanEndreStartdatoResultat(deltakelse, today),
        kanMeldesUt: kanMeldesUtResultat(deltakelse, today),
        kanEndreSluttdato: kanEndreSluttdatoResultat(deltakelse, today),
        kanSletteSluttdato: kanSletteSluttdatoResultat(deltakelse, today),
        kanForlengePeriode: periodeKanForlengesResultat(deltakelse, today),
        kanSletteDeltakelse: deltakelseKanSlettesResultat(deltakelse),
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
