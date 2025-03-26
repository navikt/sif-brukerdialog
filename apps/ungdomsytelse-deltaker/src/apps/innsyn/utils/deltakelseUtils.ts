import { isDateInDateRange } from '@navikt/sif-common-utils';
import { Rapporteringsperiode } from '@navikt/ung-common';
import dayjs from 'dayjs';

const datoErIRapporteringsperiode = (dato: Date, periode: Rapporteringsperiode): boolean => {
    return isDateInDateRange(dato, periode.periode);
};

export const getPeriodeÅpenForInntektsrapportering = (
    rapporteringsperioder: Rapporteringsperiode[],
): Rapporteringsperiode | undefined => {
    return rapporteringsperioder.find(
        (p) => datoErIRapporteringsperiode(new Date(), p) && p.harRapportert === false && p.kanRapportere === true,
    );
};

export const sorterRapporteringsperioderDesc = (r1: Rapporteringsperiode, r2: Rapporteringsperiode): number => {
    return dayjs(r2.periode.from).diff(dayjs(r1.periode.from));
};

export const erDatoIFørsteMånedIProgrammet = (dato: Date, programStartdato: Date): boolean => {
    return dayjs(dato).isSame(programStartdato, 'month');
};
