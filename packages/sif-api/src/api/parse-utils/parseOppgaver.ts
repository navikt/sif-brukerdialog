import { BrukerdialogOppgaveDto, OppgaveType } from '@navikt/ung-brukerdialog-api';

import { Oppgave } from '../../types/Oppgave';
import { OppgaveParser } from './oppgaver/oppgaveBase';
import { parseAndreLivsoppholdsytelserOppgave } from './oppgaver/parseAndreLivsoppholdsytelserOppgave';
import { parseBostedOppgave } from './oppgaver/parseBostedOppgave';
import { parseEndretPeriodeOppgave } from './oppgaver/parseEndretPeriodeOppgave';
import { parseEndretSluttdatoOppgave, parseEndretStartdatoOppgave } from './oppgaver/parseEndretStartSluttdatoOppgave';
import { parseAvvikRegisterinntektOppgave, parseRapporterInntektOppgave } from './oppgaver/parseInntektOppgaver';
import { parseOpphørVedMaksdatoOppgave, parseSøkYtelseOppgave } from './oppgaver/parseSokYtelseOgMaksdatoOppgave';

const ikkeStøttedeOppgavetyper = new Set<OppgaveType>([OppgaveType.BEKREFT_BISTAND, OppgaveType.BEKREFT_AKTIVITET]);

/**
 * `satisfies Record<OppgaveType, OppgaveParser | undefined>` krever at alle oppgavetyper fra backend
 * registreres eksplisitt. Typer uten parser registreres med `undefined` og filtreres bort.
 */
const oppgaveParsers = {
    [OppgaveType.BEKREFT_BOSTED]: parseBostedOppgave,
    [OppgaveType.BEKREFT_ANDRE_LIVSOPPHOLDSYTELSER]: parseAndreLivsoppholdsytelserOppgave,
    [OppgaveType.BEKREFT_ENDRET_STARTDATO]: parseEndretStartdatoOppgave,
    [OppgaveType.BEKREFT_ENDRET_SLUTTDATO]: parseEndretSluttdatoOppgave,
    [OppgaveType.BEKREFT_ENDRET_PERIODE]: parseEndretPeriodeOppgave,
    [OppgaveType.BEKREFT_AVVIK_REGISTERINNTEKT]: parseAvvikRegisterinntektOppgave,
    [OppgaveType.RAPPORTER_INNTEKT]: parseRapporterInntektOppgave,
    [OppgaveType.SØK_YTELSE]: parseSøkYtelseOppgave,
    [OppgaveType.BEKREFT_OPPHOR_VED_MAKSDATO]: parseOpphørVedMaksdatoOppgave,
    [OppgaveType.BEKREFT_BISTAND]: undefined,
    [OppgaveType.BEKREFT_AKTIVITET]: undefined,
} satisfies Record<OppgaveType, OppgaveParser | undefined>;

export const parseOppgaver = (oppgaver: BrukerdialogOppgaveDto[]): Oppgave[] =>
    oppgaver
        .filter(({ oppgavetype }) => !ikkeStøttedeOppgavetyper.has(oppgavetype))
        .map((oppgave) => {
            const parseOppgave: OppgaveParser | undefined = oppgaveParsers[oppgave.oppgavetype];
            if (!parseOppgave) {
                throw new Error(`Ukjent oppgavetype: ${oppgave.oppgavetype}`);
            }
            return parseOppgave(oppgave);
        });
