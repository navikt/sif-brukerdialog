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
        const { arbeidstakerOgFrilansInntekt = 0, inntektFraYtelse = 0, summertInntekt } = data;

        const periode: DateRange = {
            from: ISODateToDate(data.fraOgMed),
            to: ISODateToDate(data.tilOgMed),
        };
        const rapporteringsperiode: Rapporteringsperiode = {
            periode,
            harRapportert: data.harRapportert,
            arbeidstakerOgFrilansInntekt,
            inntektFraYtelse,
            summertInntekt,
            erÅpenRapporteringsperiode: kanBrukerRapportereInntektForPeriode(periode, programPeriode.from),
        };
        return rapporteringsperiode;
    });
};
