import dayjs from 'dayjs';
import { Rapporteringsperiode } from '../../../api/types';
import { isDateInDateRange } from '@navikt/sif-common-utils';

const datoErIRapporteringsperiode = (dato: Date, periode: Rapporteringsperiode): boolean => {
    return isDateInDateRange(dato, periode.periode);
};

export const rapporteringsperiodeErTidligerePeriode = (rapporteringsperiode: Rapporteringsperiode): boolean => {
    const { periode } = rapporteringsperiode;
    return dayjs(periode.to).isBefore(dayjs());
};

export const getGjeldendeRapporteringsperiode = (
    rapporteringsperioder: Rapporteringsperiode[],
): Rapporteringsperiode | undefined => {
    return rapporteringsperioder.find((p) => datoErIRapporteringsperiode(new Date(), p));
};

export const getTidligereRapporteringsperioder = (
    rapporteringsperioder: Rapporteringsperiode[],
): Rapporteringsperiode[] => {
    return rapporteringsperioder.filter(rapporteringsperiodeErTidligerePeriode).sort(sorterRapporteringsperioderDesc);
};

export const sorterRapporteringsperioderDesc = (r1: Rapporteringsperiode, r2: Rapporteringsperiode): number => {
    return dayjs(r2.periode.from).diff(dayjs(r1.periode.from));
};
