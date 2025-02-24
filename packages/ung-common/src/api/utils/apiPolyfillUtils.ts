import dayjs from 'dayjs';
import { DateRange } from '@navikt/sif-common-utils';
import { Deltakelse } from '../../types/Deltakelse';
import { Deltakelser } from '../../types/Deltakelser';
import { OppgaveEndretSluttdato, OppgaveEndretStartdato, Oppgavetype } from '../../types';

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

const polyfillOppgaveEndretStartdato = (oppgave: OppgaveEndretStartdato): OppgaveEndretStartdato => {
    return {
        ...oppgave,
        svarfrist: dayjs(oppgave.opprettetDato).add(14, 'days').toDate(),
        veilederReferanse: 'Pål Hønesen [TODO]',
        oppgavetypeData: {
            nyStartdato: oppgave.oppgavetypeData.nyStartdato,
            meldingFraVeileder: 'Hei, jeg har endret startdatoen  som vi avtalte i møtet fredag 21. februar.',
        },
    };
};

const polyfillOppgaveEndretSluttdato = (oppgave: OppgaveEndretSluttdato): OppgaveEndretSluttdato => {
    return {
        ...oppgave,
        svarfrist: dayjs(oppgave.opprettetDato).add(14, 'days').toDate(),
        veilederReferanse: 'Pål Hønesen [TODO]',
        oppgavetypeData: {
            nySluttdato: oppgave.oppgavetypeData.nySluttdato,
            meldingFraVeileder: `Hei, jeg har endret sluttdatoen som vi avtalte i møtet onsdag 19. februar.`,
        },
    };
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
        oppgaver: deltakelse.oppgaver.map((oppgave) =>
            oppgave.oppgavetype === Oppgavetype.BEKREFT_ENDRET_STARTDATO
                ? polyfillOppgaveEndretStartdato(oppgave)
                : polyfillOppgaveEndretSluttdato(oppgave),
        ),
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
