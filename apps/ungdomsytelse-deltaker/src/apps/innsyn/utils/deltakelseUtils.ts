import { getDateToday } from '@navikt/sif-common-utils';
import { DeltakelsePeriode } from '@shared/types/DeltakelsePeriode';
import dayjs from 'dayjs';

/**
 * Returnerer true hvis deltakelsen er aktiv, dvs. den er startet og er pågående
 * @param deltakelsePeriode
 * @returns
 */
export const erDeltakelseAvsluttet = (deltakelsePeriode: DeltakelsePeriode): boolean => {
    const today = getDateToday();
    if (deltakelsePeriode.programPeriode.to && dayjs(today).isAfter(deltakelsePeriode.programPeriode.to)) {
        return true;
    }
    return false;
};

/**
 * Returnerer true hvis deltakelsen er påbegynt, dvs. den er startet og er pågående
 * @param deltakelsePeriode
 * @returns
 */
export const erDeltakelseStartet = (deltakelsePeriode: DeltakelsePeriode): boolean => {
    const today = getDateToday();
    if (dayjs(today).isBefore(deltakelsePeriode.programPeriode.from)) {
        return false;
    }
    return true;
};
