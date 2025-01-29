import dayjs from 'dayjs';
import { Rapporteringsperiode } from '../../../api/types';

export const rapporteringsperiodeErÅpen = (rapporteringsperiode: Rapporteringsperiode): boolean =>
    rapporteringsperiode.kanRapportere && !!rapporteringsperiode.fristForRapportering;

export const rapporteringsperiodeErTidligerePeriode = (rapporteringsperiode: Rapporteringsperiode): boolean => {
    const { periode } = rapporteringsperiode;
    return dayjs(periode.to).isBefore(dayjs());
};

export const getÅpenRapporteringsperiode = (
    rapporteringsperioder: Rapporteringsperiode[],
): Rapporteringsperiode | undefined => {
    return rapporteringsperioder.find(rapporteringsperiodeErÅpen);
};

export const getTidligereRapporteringsperioder = (
    rapporteringsperioder: Rapporteringsperiode[],
): Rapporteringsperiode[] => {
    return rapporteringsperioder.filter(rapporteringsperiodeErTidligerePeriode);
};

export const sorterRapporteringsperioderDesc = (r1: Rapporteringsperiode, r2: Rapporteringsperiode): number => {
    return dayjs(r2.periode.from).diff(dayjs(r1.periode.from));
};
