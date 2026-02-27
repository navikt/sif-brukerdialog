import { DateRange } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';

dayjs.extend(minMax);

export const ANTALL_MÅNEDER_TILLATT_FOR_ENDRING = 3;

export const getEndringsdato = (): Date => {
    console.log(new Date());
    return new Date();
};

/**
 * Denne skal følge  søknadsfristvilkåret der hovedregelen er: En ytelse som gis pr. dag eller pr. måned,
 * gis for opptil tre måneder før den måneden da kravet ble satt fram, dersom vilkårene var oppfylt i denne perioden.
 * 3 måneder tilbake i tid, er tolket til å være 3 måneder tilbake, også frem til den 1ste i den måneden.
 *
 * @param endringsdato dato endring blir registrert
 * @returns DateRange
 */
export const getTillattEndringsperiode = (endringsdato: Date): DateRange => {
    return {
        from: dayjs(endringsdato)
            .startOf('month')
            .subtract(ANTALL_MÅNEDER_TILLATT_FOR_ENDRING, 'months')
            .startOf('day')
            .toDate(),
        to: dayjs(endringsdato).endOf('month').add(12, 'months').startOf('day').toDate(),
    };
};
