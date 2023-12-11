import { dateToISOString } from '@navikt/sif-common-formik-ds/lib';
import {
    DateDurationMap,
    DateRange,
    dateToday,
    dateToISODate,
    decimalDurationToDuration,
    decimalDurationToISODuration,
    Duration,
    durationToISODuration,
    DurationWeekdays,
    getDatesInDateRange,
    isDateWeekDay,
    ISODateToDate,
} from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import { TidEnkeltdagApiData, TidFasteDagerApiData } from '../../types/søknadApiData/SøknadApiData';

export const getFasteDagerApiData = ({
    monday: mandag,
    tuesday: tirsdag,
    wednesday: onsdag,
    thursday: torsdag,
    friday: fredag,
}: DurationWeekdays): TidFasteDagerApiData => ({
    mandag: mandag ? durationToISODuration(mandag) : undefined,
    tirsdag: tirsdag ? durationToISODuration(tirsdag) : undefined,
    onsdag: onsdag ? durationToISODuration(onsdag) : undefined,
    torsdag: torsdag ? durationToISODuration(torsdag) : undefined,
    fredag: fredag ? durationToISODuration(fredag) : undefined,
});

const sortTidEnkeltdagApiData = (d1: TidEnkeltdagApiData, d2: TidEnkeltdagApiData): number =>
    dayjs(d1.dato).isBefore(d2.dato, 'day') ? -1 : 1;

export const getEnkeltdagerIPeriodeApiData = (
    dagerMedPleie: Date[],
    enkeltdager: DateDurationMap,
    periode: DateRange,
    jobberNormaltTimer: number,
): TidEnkeltdagApiData[] => {
    const dager: TidEnkeltdagApiData[] = [];
    const tidNormalt = decimalDurationToISODuration(jobberNormaltTimer / 5);
    const isoDagerMedPleie = dagerMedPleie.map((d) => dateToISODate(d));

    getDatesInDateRange(periode, true).forEach((date) => {
        const dateKey = dateToISODate(date);
        const erDagMedPleie = isoDagerMedPleie.includes(dateKey);

        if (erDagMedPleie === false) {
            dager.push({
                dato: dateToISOString(date),
                tid: tidNormalt,
            });
        } else {
            dager.push({
                dato: dateToISOString(date),
                tid: durationToISODuration(enkeltdager[dateKey] || { hours: 0, minutes: 0 }),
            });
        }
    });

    return dager.sort(sortTidEnkeltdagApiData);
};

export const getEnkeltdagerMedTidPerDag = (dagerMedPleie: Date[], tidPerDag: Duration): DateDurationMap => {
    const enkeltdager: DateDurationMap = {};
    dagerMedPleie.forEach((date) => {
        enkeltdager[dateToISODate(date)] = tidPerDag;
    });
    return enkeltdager;
};

export const getNormalarbeidstidPerDag = (jobberNormaltTimer: number): Duration => {
    return decimalDurationToDuration(jobberNormaltTimer / 5);
};

export const fjernTidUtenforPeriodeOgHelgedager = (
    periode: Partial<DateRange>,
    tidEnkeltdag?: TidEnkeltdagApiData[],
): TidEnkeltdagApiData[] | undefined => {
    const { from, to } = periode;
    dateToday;
    if (!tidEnkeltdag || (!from && !to)) {
        return tidEnkeltdag;
    }
    return tidEnkeltdag.filter((dag) => {
        const dato = ISODateToDate(dag.dato);
        if (isDateWeekDay(dato) === false) {
            return false;
        }
        if (from && dayjs(dato).isBefore(from, 'day')) {
            return false;
        }
        if (to && dayjs(dato).isAfter(to, 'day')) {
            return false;
        }
        return true;
    });
};
