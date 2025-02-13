import { dateToISOString, ISOStringToDate } from '@navikt/sif-common-formik-ds';
import {
    DateDurationMap,
    DateRange,
    durationToISODuration,
    durationUtils,
    DurationWeekdays,
    isDateInDateRange,
    isDateWeekDay,
} from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import { TidEnkeltdagApiData, TimerFasteDagerApiData } from '../../types/søknad-api-data/SøknadApiData';

export const getFasteDagerApiData = ({
    monday: mandag,
    tuesday: tirsdag,
    wednesday: onsdag,
    thursday: torsdag,
    friday: fredag,
}: DurationWeekdays): TimerFasteDagerApiData => ({
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
): TidEnkeltdagApiData[] => {
    const dager: TidEnkeltdagApiData[] = [];

    Object.keys(enkeltdager).forEach((dag) => {
        const dato = ISOStringToDate(dag);
        if (dato && isDateInDateRange(dato, periode) && isDateWeekDay(dato)) {
            if (durationUtils.durationIsZero(enkeltdager[dag])) {
                return;
            }
            dager.push({
                dato: dateToISOString(dato),
                tid: durationToISODuration(enkeltdager[dag]),
            });
        }
    });
    return dager.sort(sortTidEnkeltdagApiData);
};
