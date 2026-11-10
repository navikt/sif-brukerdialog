import { DateRange } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';

dayjs.extend(minMax);

export const ANTALL_MÅNEDER_TILLATT_FOR_ENDRING = 3;

export const getEndringsdato = (): Date => {
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
        to: dayjs(endringsdato).add(12, 'months').endOf('month').startOf('day').toDate(),
    };
};

/**
 * Sann når ingen av søknadsperiodene strekker seg inn i endringsperioden.
 * En sak uten søknadsperioder er ikke eldre, den er mangelfull.
 */
export const erSakEldreEnnEndringsperiode = (
    søknadsperioder: DateRange[],
    tillattEndringsperiode: DateRange,
): boolean =>
    søknadsperioder.length > 0 &&
    søknadsperioder.every((periode) => dayjs(periode.to).isBefore(tillattEndringsperiode.from, 'day'));

/**
 * Perioden arbeidsgivere hentes for: snittet av sakens samlede søknadsperiode og endringsperioden.
 *
 * @returns undefined når periodene ikke overlapper
 */
export const getOppslagsperiode = (
    samletSøknadsperiode: DateRange,
    tillattEndringsperiode: DateRange,
): DateRange | undefined => {
    const periode: DateRange = {
        from: dayjs.max(dayjs(samletSøknadsperiode.from), dayjs(tillattEndringsperiode.from))!.toDate(),
        to: dayjs.min(dayjs(samletSøknadsperiode.to), dayjs(tillattEndringsperiode.to))!.toDate(),
    };
    return dayjs(periode.to).isBefore(periode.from, 'day') ? undefined : periode;
};
