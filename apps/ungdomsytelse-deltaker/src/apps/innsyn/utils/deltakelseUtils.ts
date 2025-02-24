import { isDateInDateRange } from '@navikt/sif-common-utils';
import { Rapporteringsperiode } from '@navikt/ung-common';
import dayjs from 'dayjs';

const datoErIRapporteringsperiode = (dato: Date, periode: Rapporteringsperiode): boolean => {
    return isDateInDateRange(dato, periode.periode);
};

export const rapporteringsperiodeErTidligerePeriode = (rapporteringsperiode: Rapporteringsperiode): boolean => {
    const { periode } = rapporteringsperiode;
    return dayjs(periode.to).isBefore(dayjs(), 'day');
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

export const erDatoIFørsteMånedIProgrammet = (dato: Date, programStartdato: Date): boolean => {
    return dayjs(dato).isSame(programStartdato, 'month');
};
