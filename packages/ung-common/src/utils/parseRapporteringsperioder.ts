import { DateRange, ISODateToDate, OpenDateRange } from '@navikt/sif-common-utils';
import { RapportPeriodeinfoDto } from '@navikt/ung-deltakelse-opplyser-api';
import { Rapporteringsperiode } from '../types';
import dayjs from 'dayjs';

const erDatoIFørsteMånedIProgrammet = (dato: Date, programStartdato: Date): boolean => {
    return dayjs(dato).isSame(programStartdato, 'month');
};

const kanBrukerRapportereInntektForPeriode = (periode: DateRange, programStartdato: Date): boolean => {
    return erDatoIFørsteMånedIProgrammet(periode.from, programStartdato) === false;
};

export const parseRapporteringsperioder = (
    programPeriode: OpenDateRange,
    rapporteringsperioder: RapportPeriodeinfoDto[],
): Rapporteringsperiode[] => {
    return rapporteringsperioder.map((data) => {
        const periode: DateRange = {
            from: ISODateToDate(data.fraOgMed),
            to: ISODateToDate(data.tilOgMed),
        };
        return {
            periode,
            harRapportert: data.harRapportert,
            kanRapportere: kanBrukerRapportereInntektForPeriode(periode, programPeriode.from),
            fristForRapportering: dayjs().endOf('month').toDate(), // TODO
            inntekt: {
                // TODO
                arbeidstakerOgFrilansInntekt: 0,
                næringsinntekt: 0,
                inntektFraYtelse: 0,
                summertInntekt: 0,
            },
        };
    });
};
