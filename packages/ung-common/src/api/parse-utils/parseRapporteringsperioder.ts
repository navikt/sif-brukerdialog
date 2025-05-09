import { DateRange, getDateToday, isDateInDateRange, ISODateToDate, OpenDateRange } from '@navikt/sif-common-utils';
import { RapportPeriodeinfoDto } from '@navikt/ung-deltakelse-opplyser-api';
import dayjs from 'dayjs';
import { Rapporteringsperiode } from '../../types';

const erDatoIFørsteMånedIProgrammet = (dato: Date, programStartdato: Date): boolean => {
    return dayjs(dato).isSame(programStartdato, 'month');
};

const erDatoISisteMånedIProgrammet = (dato: Date, programSluttdato: Date): boolean => {
    return dayjs(dato).isSame(programSluttdato, 'month');
};

export const getTillattRapporteringsperiodeForMåned = (dato: Date): DateRange => {
    const from = dayjs(dato).set('date', 1).toDate();
    const to = dayjs(dato).set('date', 6).toDate();
    return { from, to };
};

const erPeriodeInnforTillattRapporteringstidsrom = (periode: DateRange, programPeriode: OpenDateRange): boolean => {
    /** Skal ikke rapportere for første måned */
    if (erDatoIFørsteMånedIProgrammet(periode.from, programPeriode.from)) {
        return false;
    }
    if (programPeriode.to && erDatoISisteMånedIProgrammet(periode.to, programPeriode.to)) {
        return false;
    }
    return isDateInDateRange(getDateToday(), getTillattRapporteringsperiodeForMåned(periode.from));
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
            erÅpenRapporteringsperiode:
                erPeriodeInnforTillattRapporteringstidsrom(periode, programPeriode) && data.harRapportert === false,
        };
        return rapporteringsperiode;
    });
};
