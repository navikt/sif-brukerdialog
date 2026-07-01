import { dateToISODate, ISODateToDate } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import { addUkedagerToDate } from '../src/utils/deltakelseUtils';
import { demoMockDate } from './mockConstants';

/** ISO-dato relativt til demoMockDate */
export const relativeMockISODate = (amount: number, unit: dayjs.ManipulateType): string => {
    return dateToISODate(dayjs(demoMockDate).add(amount, unit).toDate());
};

/** ISO-timestamp relativt til demoMockDate */
export const relativeMockTimestamp = (amount: number, unit: dayjs.ManipulateType): string => {
    return dayjs(demoMockDate).add(amount, unit).toISOString();
};

/** Beregner periodeMaksDato basert på fraOgMed ISO-dato (260 ukedager) */
export const beregnPeriodeMaksDato = (fraOgMedISO: string): string => {
    return dateToISODate(addUkedagerToDate(ISODateToDate(fraOgMedISO), 260));
};
