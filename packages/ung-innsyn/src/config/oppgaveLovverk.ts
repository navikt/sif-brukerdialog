import { OppgaveType, OppgaveYtelsetype } from '@navikt/ung-brukerdialog-api';

export type Lovlenke = {
    url: string;
    tekst: string;
};

const FORSKRIFT_UPY_URL = 'https://lovdata.no/dokument/LTI/forskrift/2025-06-20-1182';

/** Katalog over alle lovlenker som brukes i oppgavepaneler */
export const LENKEKATALOG = {
    /** BEKREFT_ENDRET_STARTDATO, BEKREFT_ENDRET_SLUTTDATO, BEKREFT_ENDRET_PERIODE */
    forskriftUpy_8_3_6: {
        url: FORSKRIFT_UPY_URL,
        tekst: '§ 8 jf. § 3 og § 6 i Forskrift om forsøk om ungdomsprogram og ungdomsprogramytelse (lovdata.no)',
    },
    /** BEKREFT_OPPHOR_VED_MAKSDATO */
    forskriftUpy_8_3: {
        url: FORSKRIFT_UPY_URL,
        tekst: '§ 8 jf. § 3 i Forskrift om forsøk om ungdomsprogram og ungdomsprogramytelse (lovdata.no)',
    },
    /** SØK_YTELSE */
    forskriftUpy_8_3_6_9_10: {
        url: FORSKRIFT_UPY_URL,
        tekst: '§ 8 jf. § 3 og §§ 6, 9 og 10 i Forskrift om forsøk om ungdomsprogram og ungdomsprogramytelse (lovdata.no)',
    },
    /** BEKREFT_AVVIK_REGISTERINNTEKT, RAPPORTER_INNTEKT */
    forskriftUpy_11: {
        url: FORSKRIFT_UPY_URL,
        tekst: '§ 11 i Forskrift om forsøk med ungdomsprogram og ungdomsprogramytelse (gjelder fra 1. august 2025) (lovdata.no)',
    },
    /** TODO: oppdater url og paragraf når forskrift for aktivitetspenger er publisert på lovdata */
    forskriftAktivitetspenger: {
        url: 'https://www.nav.no#todo',
        tekst: 'Forskrift om aktivitetspenger (lovdata.no)',
    },
} satisfies Record<string, Lovlenke>;

const { forskriftUpy_8_3_6: upy_8_3_6, forskriftUpy_8_3: upy_8_3 } = LENKEKATALOG;
const { forskriftUpy_8_3_6_9_10: upy_8_3_6_9_10, forskriftUpy_11: upy_11 } = LENKEKATALOG;
const { forskriftAktivitetspenger: ap } = LENKEKATALOG;

/**
 * Deklarativ tabell over hvilke lovhenvisninger som gjelder per oppgavetype og ytelse.
 * Kilde: https://github.com/navikt/ung-brukerdialog-api/blob/master/brukerdialog-oppgave/docs/README.md
 *
 * `satisfies Record<OppgaveType, ...>` sørger for at TypeScript varsler ved kompilering
 * dersom en ny OppgaveType legges til uten at tabellen oppdateres.
 */
export const OPPGAVE_LOVVERK = {
    BEKREFT_ENDRET_STARTDATO:     { UNGDOMSYTELSE: [upy_8_3_6] },
    BEKREFT_ENDRET_SLUTTDATO:     { UNGDOMSYTELSE: [upy_8_3_6] },
    BEKREFT_ENDRET_PERIODE:       { UNGDOMSYTELSE: [upy_8_3_6] },
    BEKREFT_OPPHOR_VED_MAKSDATO:  { UNGDOMSYTELSE: [upy_8_3] },
    BEKREFT_AVVIK_REGISTERINNTEKT:{ UNGDOMSYTELSE: [upy_11], AKTIVITETSPENGER: [ap] },
    RAPPORTER_INNTEKT:            { UNGDOMSYTELSE: [upy_11], AKTIVITETSPENGER: [ap] },
    SØK_YTELSE:                   { UNGDOMSYTELSE: [upy_8_3_6_9_10] },
    BEKREFT_BOSTED:               {},
} satisfies Record<OppgaveType, Partial<Record<OppgaveYtelsetype, Lovlenke[]>>>;

export const getLovLenker = (oppgave: { oppgavetype: OppgaveType; ytelsetype: OppgaveYtelsetype }): Lovlenke[] =>
    OPPGAVE_LOVVERK[oppgave.oppgavetype]?.[oppgave.ytelsetype] ?? [];
