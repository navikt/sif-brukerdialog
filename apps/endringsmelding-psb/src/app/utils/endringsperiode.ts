import { DateRange } from '@navikt/sif-common-utils';
import { getDateRangeFromDateRanges } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import minMax from 'dayjs/plugin/minMax';

dayjs.extend(minMax);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export const getEndringsdato = (): Date => new Date();

export const getMaksEndringsperiode = (endringsdato: Date): DateRange => ({
    from: dayjs(endringsdato).subtract(3, 'months').startOf('day').toDate(),
    to: dayjs(endringsdato).add(6, 'months').endOf('day').toDate(),
});

/**
 * Finner periode som kan endres basert på endringsdato og søknadsperioder i sak
 * @param endringsdato dato endring ble påbegynt
 * @param søknadsperioder liste av søknadsprioder fra en sak
 * @returns DateRange for perioden som kan endres
 */
export const getEndringsperiode = (endringsdato: Date, søknadsperioder: DateRange[]): DateRange => {
    const maksEndringsperiode = getMaksEndringsperiode(endringsdato);
    const søknadsperioderDateRange = getDateRangeFromDateRanges(søknadsperioder);
    return {
        from: dayjs.max(dayjs(søknadsperioderDateRange.from), dayjs(maksEndringsperiode.from)).toDate(),
        to: dayjs.min(dayjs(søknadsperioderDateRange.to), dayjs(maksEndringsperiode.to)).toDate(),
    };
};

export const getSøknadsperioderInnenforTillattEndringsperiode = (
    endringsdato: Date,
    søknadsperioder: DateRange[]
): DateRange[] => {
    const yttergrenser = getMaksEndringsperiode(endringsdato);
    const perioder = søknadsperioder.filter(
        (periode) =>
            dayjs(periode.to).isSameOrAfter(yttergrenser.from) && dayjs(periode.from).isSameOrBefore(yttergrenser.to)
    );
    if (perioder.length === 0) {
        return [];
    }
    /** Trim ned perioder til å ikke gå utenfor maksperiode */
    perioder[0].from = dayjs.max(dayjs(perioder[0].from), dayjs(yttergrenser.from)).toDate();
    const idxSistePeriode = perioder.length - 1;
    perioder[idxSistePeriode].to = dayjs.min(dayjs(perioder[idxSistePeriode].to), dayjs(yttergrenser.to)).toDate();
    return perioder;
};
