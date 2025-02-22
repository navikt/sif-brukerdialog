import dayjs from 'dayjs';
import { DateRange } from '@navikt/sif-common-utils';
import { Deltakelse } from '../../types/Deltakelse';
import { Deltakelser } from '../../types/Deltakelser';

const erDatoIFørsteMånedIProgrammet = (dato: Date, programStartdato: Date): boolean => {
    return dayjs(dato).isSame(programStartdato, 'month');
};

/**
 * Sjekker om bruker kan rapportere inntekt for en gitt periode.
 * Regel: Bruker kan ikke rapportere inntekt den første måneden en er med i programmet
 *
 * @param periode - rapporteringsperiode
 * @param programStartdato - dato deltaker blir med i programmet
 * @returns boolean
 */
export const kanBrukerRapportereInntektForPeriode = (periode: DateRange, programStartdato: Date): boolean => {
    return erDatoIFørsteMånedIProgrammet(periode.from, programStartdato) === false;
};

/**
 * Polyfill for å sette props som enda ikke er implementert i backend
 * @param deltakelse
 * @returns Deltakelse
 */
const polyfillDeltakelse = (deltakelse: Deltakelse): Deltakelse => {
    const { programPeriode, rapporteringsPerioder, harSøkt } = deltakelse;
    /** Bruker har ikke søkt -> ingen polyfill */
    if (!harSøkt) {
        return deltakelse;
    }
    /** Ingen rapporteringsperioden -> ingen polyfill */
    if (!rapporteringsPerioder) {
        return deltakelse;
    }

    return {
        ...deltakelse,
        rapporteringsPerioder: rapporteringsPerioder.map((rapporteringsperiode) => {
            return {
                ...rapporteringsperiode,
                kanRapportere: kanBrukerRapportereInntektForPeriode(rapporteringsperiode.periode, programPeriode.from),
            };
        }),
    };
};

export const polyfillManglendeBackendLogikk = (deltakelser: Deltakelser): Deltakelser => {
    return deltakelser.map(polyfillDeltakelse);
};
