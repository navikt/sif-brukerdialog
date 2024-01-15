import { DateRange } from '@navikt/sif-common-formik-ds/src';
import dayjs from 'dayjs';

interface MedlemsskapDateRanges {
    siste12Måneder: DateRange;
    neste12Måneder: DateRange;
}

/** Kode gjeldende tom 4. sept - usikker hvorfor logikken var slik

    const getFomForBostedNeste12 = (søknadsdato: Date, bostedSiste12måneder: BostedUtland[]): Date => {
        const sisteBosted =
            bostedSiste12måneder.length > 0 ? bostedSiste12måneder[bostedSiste12måneder.length - 1] : undefined;
        if (sisteBosted) {
            return dayjs(sisteBosted.tom).isSame(søknadsdato, 'day')
                ? dayjs(søknadsdato).add(1, 'day').toDate()
                : søknadsdato;
        }
        return søknadsdato;
    };
*/

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
