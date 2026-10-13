import { DateRange } from '@navikt/sif-common-formik-ds';
import dayjs from 'dayjs';

interface MedlemskapDateRanges {
    siste12Måneder: DateRange;
    neste12Måneder: DateRange;
}

export const getMedlemskapDateRanges = (søknadsdato: Date): MedlemskapDateRanges => {
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
