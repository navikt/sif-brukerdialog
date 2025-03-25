import { DateRange, getDateToday, isDateInDateRange, ISODateToDate, OpenDateRange } from '@navikt/sif-common-utils';
import { RapportPeriodeinfoDto } from '@navikt/ung-deltakelse-opplyser-api';
import dayjs from 'dayjs';
import { Rapporteringsperiode } from '../../types';

const erDatoIFørsteMånedIProgrammet = (dato: Date, programStartdato: Date): boolean => {
    return dayjs(dato).isSame(programStartdato, 'month');
};

const getTillattRapporteringsperiodeForMåned = (dato: Date): DateRange => {
    return { from: dayjs(dato).startOf('month').toDate(), to: dayjs(dato).add(6, 'days').toDate() };
};

const kanBrukerRapportereInntektForPeriode = (periode: DateRange, programStartdato: Date): boolean => {
    /** Skal ikke rapportere for første måned */
    if (erDatoIFørsteMånedIProgrammet(periode.from, programStartdato)) {
        return false;
    }
    /** Kan rapportere hvis dagens dato er innenfor tillatt rapporteringsperiode for måned */
    const rapporteringsperiodeIMåned = getTillattRapporteringsperiodeForMåned(periode.from);
    return isDateInDateRange(getDateToday(), rapporteringsperiodeIMåned);
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
            kanRapportere: !!data.harRapportert && kanBrukerRapportereInntektForPeriode(periode, programPeriode.from),
            fristForRapportering: dayjs().endOf('month').toDate(), // TODO
            inntekt: {
                arbeidOgFrilansInntekter,
                ytelseInntekter,
                summertInntekt: arbeidOgFrilansInntekter + ytelseInntekter,
            },
        };
    });
};
