import { DateRange, ISODateToDate, OpenDateRange } from '@navikt/sif-common-utils';
import { RapportPeriodeinfoDto } from '@navikt/ung-deltakelse-opplyser-api';
import dayjs from 'dayjs';
import { Rapporteringsperiode } from '../../types';

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
        const { arbeidOgFrilansInntekter = 0, ytelseInntekter = 0 } = data;

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
                arbeidOgFrilansInntekter,
                ytelseInntekter,
                summertInntekt: arbeidOgFrilansInntekter + ytelseInntekter,
            },
        };
    });
};
