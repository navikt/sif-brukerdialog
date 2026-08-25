import { OppgaveType, OppgaveYtelsetype } from '@navikt/ung-brukerdialog-api';
import { ParsedOppgavetype } from '@sif/api/ung-brukerdialog';

import type { UngUiMessageKeys } from '../../i18n';

export type Lovlenke = {
    url: string;
    tekstKey: UngUiMessageKeys;
};

const FORSKRIFT_UPY_URL = 'https://lovdata.no/dokument/LTI/forskrift/2025-06-20-1182';

/** Katalog over alle lovlenker som brukes i oppgavepaneler */
export const LENKEKATALOG = {
    arbeidsmarkedsloven_13_fjerde_ledd: {
        url: 'https://lovdata.no/lov/2004-12-10-76/%C2%A713',
        tekstKey: '@ungInnsyn.lovlenke.arbeidsmarkedsloven_13_fjerde_ledd',
    },
    forskriftUpy_11: {
        url: FORSKRIFT_UPY_URL,
        tekstKey: '@ungInnsyn.lovlenke.forskriftUpy_11',
    },
} satisfies Record<string, Lovlenke>;

const ufyFelles = [LENKEKATALOG.arbeidsmarkedsloven_13_fjerde_ledd, LENKEKATALOG.forskriftUpy_11];

/**
 * Deklarativ tabell over hvilke lovhenvisninger som gjelder per oppgavetype og ytelse.
 * `satisfies Record<OppgaveType, ...>` sørger for at TypeScript varsler ved kompilering
 * dersom en ny OppgaveType legges til uten at tabellen oppdateres.
 */
export const OPPGAVE_LOVVERK = {
    BEKREFT_ENDRET_STARTDATO: { UNGDOMSYTELSE: ufyFelles },
    BEKREFT_ENDRET_SLUTTDATO: { UNGDOMSYTELSE: ufyFelles },
    BEKREFT_ENDRET_PERIODE: { UNGDOMSYTELSE: ufyFelles },
    BEKREFT_OPPHOR_VED_MAKSDATO: { UNGDOMSYTELSE: ufyFelles },
    BEKREFT_AVVIK_REGISTERINNTEKT: {
        UNGDOMSYTELSE: ufyFelles,
    },
    RAPPORTER_INNTEKT: { UNGDOMSYTELSE: ufyFelles },
    SØK_YTELSE: { UNGDOMSYTELSE: ufyFelles },
    BEKREFT_BOSTED: {},
} satisfies Record<OppgaveType, Partial<Record<OppgaveYtelsetype, Lovlenke[]>>>;

export const getLovLenker = (oppgave: { oppgavetype: OppgaveType; ytelsetype: OppgaveYtelsetype }): Lovlenke[] =>
    OPPGAVE_LOVVERK[oppgave.oppgavetype]?.[oppgave.ytelsetype] ?? [];

export const OPPGAVE_LOVVERK_PARSED = {
    BEKREFT_ENDRET_STARTDATO: { UNGDOMSYTELSE: ufyFelles },
    BEKREFT_ENDRET_SLUTTDATO: { UNGDOMSYTELSE: ufyFelles },
    BEKREFT_MELDT_UT: { UNGDOMSYTELSE: ufyFelles },
    BEKREFT_FJERNET_PERIODE: { UNGDOMSYTELSE: ufyFelles },
    BEKREFT_ENDRET_START_OG_SLUTTDATO: { UNGDOMSYTELSE: ufyFelles },
    BEKREFT_OPPHOR_VED_MAKSDATO: { UNGDOMSYTELSE: ufyFelles },
    BEKREFT_AVVIK_REGISTERINNTEKT: {
        UNGDOMSYTELSE: ufyFelles,
    },
    RAPPORTER_INNTEKT: { UNGDOMSYTELSE: ufyFelles },
    SØK_YTELSE: { UNGDOMSYTELSE: ufyFelles },
    BEKREFT_BOSTED: {},
    BEKREFT_BOSTED_OPPHØR: {},
} satisfies Record<ParsedOppgavetype, Partial<Record<OppgaveYtelsetype, Lovlenke[]>>>;

export const getLovLenkerForParsedType = (oppgave: {
    parsedOppgavetype: ParsedOppgavetype;
    ytelsetype: OppgaveYtelsetype;
}): Lovlenke[] => OPPGAVE_LOVVERK_PARSED[oppgave.parsedOppgavetype]?.[oppgave.ytelsetype] ?? [];
