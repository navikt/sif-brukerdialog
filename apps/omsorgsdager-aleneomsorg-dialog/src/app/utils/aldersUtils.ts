import { getDateToday } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';

export const aldersBegrensingOver = (fødselsdato: Date, maxGrenseYears: number): boolean => {
    return dayjs().diff(fødselsdato, 'year') <= maxGrenseYears;
};

export const nYearsAgo = (years: number): Date => {
    return dayjs(getDateToday()).subtract(years, 'y').startOf('year').toDate();
};
