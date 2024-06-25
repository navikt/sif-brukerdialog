import { DateRange } from '@navikt/sif-common-formik-ds/src';
import dayjs from 'dayjs';

interface MedlemsskapDateRanges {
    siste12Måneder: DateRange;
    neste12Måneder: DateRange;
}

export const getMedlemsskapDateRanges = (søknadsdato: Date): MedlemsskapDateRanges => {
    return {
        siste12Måneder: {
            from: dayjs(søknadsdato).subtract(1, 'year').toDate(),
            to: dayjs(søknadsdato).subtract(1, 'day').toDate(),
        },
        neste12Måneder: {
            from: søknadsdato,
            to: dayjs(søknadsdato).add(1, 'year').toDate(),
        },
    };
};
