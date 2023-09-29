import {
    DateDurationMap,
    DateRange,
    dateToday,
    dateToISODate,
    decimalDurationToISODuration,
    durationToISODuration,
    DurationWeekdays,
    getDatesInDateRange,
    isDateWeekDay,
    ISODateToDate,
} from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import { durationUtils } from '@navikt/sif-common-utils';
import { TidEnkeltdagApiData, TidFasteDagerApiData } from '../../types/søknadApiData/SøknadApiData';
import { dateToISOString } from '@navikt/sif-common-formik-ds/lib';

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
    enkeltdager: DateDurationMap,
    periode: DateRange,
    jobberNormaltTimer: number,
): TidEnkeltdagApiData[] => {
    const dager: TidEnkeltdagApiData[] = [];
    const tidNormalt = decimalDurationToISODuration(jobberNormaltTimer / 5);

    getDatesInDateRange(periode, true).forEach((dato) => {
        const dag = dateToISODate(dato);

        if (enkeltdager[dag] === undefined || durationUtils.durationIsZero(enkeltdager[dag])) {
            dager.push({
                dato: dateToISOString(dato),
                tid: tidNormalt,
            });
        } else {
            dager.push({
                dato: dateToISOString(dato),
                tid: durationToISODuration(enkeltdager[dag]),
            });
        }
    });

    // Object.keys(enkeltdager).forEach((dag) => {
    //     const dato = ISOStringToDate(dag);
    //     if (dato && isDateInDateRange(dato, periode) && isDateWeekDay(dato)) {
    //         if (durationUtils.durationIsZero(enkeltdager[dag])) {
    //             return;
    //         }
    //         dager.push({
    //             dato: dateToISOString(dato),
    //             tid: durationToISODuration(enkeltdager[dag]),
    //         });
    //     }
    // });

    return dager.sort(sortTidEnkeltdagApiData);
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
