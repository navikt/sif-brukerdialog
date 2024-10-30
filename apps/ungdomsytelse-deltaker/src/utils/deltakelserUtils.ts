import { DateRange } from '@navikt/sif-common-formik-ds';
import { getDateToday } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import { Deltakelse, DeltakelseSøktFor } from '../api/types';

export const getDeltakelserSøktFor = (deltakelser: DeltakelseSøktFor[]) => {
    return deltakelser.filter((deltakelse) => deltakelse.harSøkt && deltakelse.tilOgMed && deltakelse.fraOgMed);
};

export const deltakelseErSøktFor = (deltakelser: DeltakelseSøktFor[]) => deltakelser.filter(isDeltakelseSøktFor);

export const isDeltakelseSøktFor = (deltakelse: any): deltakelse is DeltakelseSøktFor => {
    return deltakelse.harSøkt && deltakelse.tilOgMed && deltakelse.fraOgMed;
};

export const deltakelseErÅpenForRapportering = (deltakelse: Deltakelse) => {
    return isDeltakelseSøktFor(deltakelse) && getGyldigInntektsrapporteringsperiode(deltakelse) !== undefined;
};

export const getDeltakelserÅpenForRapportering = (deltakelser: Deltakelse[]): DeltakelseSøktFor[] => {
    return deltakelser.filter(deltakelseErÅpenForRapportering) as DeltakelseSøktFor[];
};

export const getGyldigInntektsrapporteringsperiode = (deltakelse: DeltakelseSøktFor): DateRange | undefined => {
    const today = getDateToday();
    if (dayjs(deltakelse.fraOgMed).isSameOrAfter(today)) {
        return undefined;
    }
    return {
        from: deltakelse.fraOgMed,
        to: dayjs.min(dayjs(deltakelse.tilOgMed), dayjs(today)).toDate(),
    };
};

export const getMånederForInnteksrapportering = (deltakelse: DeltakelseSøktFor): DateRange[] => {
    const periode = getGyldigInntektsrapporteringsperiode(deltakelse);
    if (periode) {
        return getMonthsInDateRange(periode);
    }
    return [];
};

const getMonthsInDateRange = (dateRange: DateRange): DateRange[] => {
    const months: DateRange[] = [];
    let current = dayjs(dateRange.from).startOf('month');
    const end = dayjs(dateRange.to).startOf('month');

    while (current.isSameOrBefore(end)) {
        const monthStart = current.startOf('month').toDate();
        const monthEnd = current.endOf('month').toDate();
        months.push({ from: monthStart, to: monthEnd });
        current = current.add(1, 'month');
    }

    return months;
};
