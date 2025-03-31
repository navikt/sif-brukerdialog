import { DateRange, getDateToday } from '@navikt/sif-common-utils';
import { DeltakelsePeriode, Rapporteringsperiode } from '@navikt/ung-common';
import dayjs from 'dayjs';

/**
 * Finner tidsrom hvor bruker kan rapportere inntekt for en måned. Dette er
 * fom 1. tom 6. i påfølgende måned.
 * @param inntektsmåned Måned det skal rapporteres inntekt for
 * @returns DateRange
 */
export const getTidsromForInntektsrapportering = (inntektsmåned: Date): DateRange => {
    const from = dayjs(inntektsmåned).startOf('month').add(1, 'month').startOf('day');
    return {
        from: from.toDate(),
        to: from.add(5, 'days').toDate(),
    };
};

export const getFristForRapporteringsperiode = (periode: DateRange): Date => {
    return dayjs.min(dayjs(periode.to), dayjs(periode.from).startOf('month').add(6, 'days')).toDate();
};

export const getPeriodeÅpenForInntektsrapportering = (
    rapporteringsperioder: Rapporteringsperiode[],
): Rapporteringsperiode | undefined => {
    const perioder = rapporteringsperioder.filter(
        (p) => p.erÅpenRapporteringsperiode === true && p.harRapportert === false,
    );
    if (perioder.length === 0) {
        return undefined;
    }
    if (perioder.length === 1) {
        return perioder[0];
    }
    throw 'Det er flere åpne perioder for inntektsrapportering';
};

export const sorterRapporteringsperioderDesc = (r1: Rapporteringsperiode, r2: Rapporteringsperiode): number => {
    return dayjs(r2.periode.from).diff(dayjs(r1.periode.from));
};

export const erDatoIFørsteMånedIProgrammet = (dato: Date, programStartdato: Date): boolean => {
    return dayjs(dato).isSame(programStartdato, 'month');
};

/**
 * Returnerer true hvis deltakelsen er aktiv, dvs. den er startet og er pågående
 * @param deltakelse
 * @returns
 */
export const erDeltakelseAktiv = (deltakelse: DeltakelsePeriode): boolean => {
    const today = getDateToday();
    if (dayjs(today).isBefore(deltakelse.programPeriode.from)) {
        return false;
    }
    if (deltakelse.programPeriode.to && dayjs(today).isAfter(deltakelse.programPeriode.to)) {
        return false;
    }
    return true;
};

/**
 * Returnerer true hvis deltakelsen er aktiv, dvs. den er startet og er pågående
 * @param deltakelse
 * @returns
 */
export const erDeltakelseAvsluttet = (deltakelse: DeltakelsePeriode): boolean => {
    const today = getDateToday();
    if (deltakelse.programPeriode.to && dayjs(today).isAfter(deltakelse.programPeriode.to)) {
        return true;
    }
    return false;
};

/**
 * Returnerer true hvis deltakelsen er påbegynt, dvs. den er startet og er pågående
 * @param deltakelse
 * @returns
 */
export const erDeltakelseStartet = (deltakelse: DeltakelsePeriode): boolean => {
    const today = getDateToday();
    if (dayjs(today).isBefore(deltakelse.programPeriode.from)) {
        return false;
    }
    return true;
};
