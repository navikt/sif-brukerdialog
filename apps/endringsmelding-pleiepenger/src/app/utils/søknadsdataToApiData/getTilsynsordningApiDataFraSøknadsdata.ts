import {
    DateDurationMap,
    dateToISODate,
    durationToISODuration,
    ISODateRangeMap,
    ISODuration,
} from '@navikt/sif-common-utils';
import { TilsynsordningApiData, TilsynsordningPeriodeApiData, TilsynsordningSøknadsdata } from '@types';

export const getTilsynsordningApiDataFraSøknadsdata = (
    tilsynsordning: TilsynsordningSøknadsdata,
): TilsynsordningApiData => {
    const perioder = periodiserDateDurationMap(tilsynsordning.tilsynsdagerMap);
    const tilsynsordningPerioder: ISODateRangeMap<TilsynsordningPeriodeApiData> = {};
    Object.keys(perioder).forEach((periodeKey): void => {
        tilsynsordningPerioder[periodeKey] = {
            etablertTilsynTimerPerDag: perioder[periodeKey],
        };
    });
    return { perioder: tilsynsordningPerioder };
};

const getNextWeekday = (date: Date): Date => {
    const next = new Date(date);
    next.setDate(next.getDate() + 1);
    while (next.getDay() === 0 || next.getDay() === 6) {
        next.setDate(next.getDate() + 1);
    }
    return next;
};

const isConsecutiveWeekday = (prevDate: string, currDate: string): boolean => {
    const expectedNext = getNextWeekday(new Date(prevDate));
    return dateToISODate(expectedNext) === currDate;
};

const createPeriodeKey = (startDate: string, endDate: string): string => `${startDate}/${endDate}`;

export const periodiserDateDurationMap = (enkeltdager: DateDurationMap): ISODateRangeMap<ISODuration> => {
    const sortedDates = Object.keys(enkeltdager).sort();

    if (sortedDates.length === 0) {
        return {};
    }

    const perioder: ISODateRangeMap<ISODuration> = {};
    let periodeStart = sortedDates[0];
    let periodeEnd = periodeStart;
    let periodeDuration = durationToISODuration(enkeltdager[periodeStart]);

    for (let i = 1; i < sortedDates.length; i++) {
        const currentDate = sortedDates[i];
        const currentDuration = durationToISODuration(enkeltdager[currentDate]);

        const canMerge = periodeDuration === currentDuration && isConsecutiveWeekday(periodeEnd, currentDate);

        if (canMerge) {
            periodeEnd = currentDate;
        } else {
            perioder[createPeriodeKey(periodeStart, periodeEnd)] = periodeDuration;
            periodeStart = currentDate;
            periodeEnd = currentDate;
            periodeDuration = currentDuration;
        }
    }

    perioder[createPeriodeKey(periodeStart, periodeEnd)] = periodeDuration;

    return perioder;
};
