import { DateRange } from '@navikt/sif-common-formik-ds';
import { getDateToday } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import { Deltakelse, Rapporteringsperiode } from '../api/types';

export const periodeKanRapporteresFor = ({ harSøkt, periode }: Rapporteringsperiode): boolean => {
    return harSøkt && dayjs(periode.from).isBefore(getDateToday());
};

export const deltakelseErÅpenForRapportering = (deltakelse: Deltakelse) => {
    return deltakelse.harSøkt && deltakelse.rapporteringsPerioder && deltakelse.rapporteringsPerioder.length > 0;
};

export const getMånederForInnteksrapportering = (deltakelse: Deltakelse): DateRange[] => {
    const { rapporteringsPerioder, harSøkt } = deltakelse;
    if (!rapporteringsPerioder || !harSøkt) {
        return [];
    }
    const perioder: DateRange[] = rapporteringsPerioder.map((r) => r.periode);
    return perioder
        .filter((periode) => periodeKanRapporteresFor({ harSøkt: true, periode }))
        .map((periode) => {
            return {
                from: periode.from,
                to: dayjs.min([dayjs(periode.to), dayjs()]).toDate(),
            };
        });
};
