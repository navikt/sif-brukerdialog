import { BrukerdialogOppgaveDto, OppgaveType } from '@sif/ung-brukerdialog-api';

import { Oppgave } from '../Oppgave';
import { OppgaveParser } from './oppgaver/oppgaveBase';
import { parseAktivitetOppgave } from './oppgaver/parseAktivitetOppgave';
import { parseAndreLivsoppholdsytelserOppgave } from './oppgaver/parseAndreLivsoppholdsytelserOppgave';
import { parseBistandOppgave } from './oppgaver/parseBistandOppgave';
import { parseBostedOppgave } from './oppgaver/parseBostedOppgave';
import { parseEndretPeriodeOppgave } from './oppgaver/parseEndretPeriodeOppgave';
import { parseEndretSluttdatoOppgave, parseEndretStartdatoOppgave } from './oppgaver/parseEndretStartSluttdatoOppgave';
import { parseAvvikRegisterinntektOppgave, parseRapporterInntektOppgave } from './oppgaver/parseInntektOppgaver';
import { parseOpphørVedMaksdatoOppgave, parseSøkYtelseOppgave } from './oppgaver/parseSokYtelseOgMaksdatoOppgave';

/** `satisfies Record<OppgaveType, OppgaveParser>` krever at alle oppgavetyper fra backend har en parser. */
const oppgaveParsers = {
    [OppgaveType.BEKREFT_BOSTED]: parseBostedOppgave,
    [OppgaveType.BEKREFT_ANDRE_LIVSOPPHOLDSYTELSER]: parseAndreLivsoppholdsytelserOppgave,
    [OppgaveType.BEKREFT_AKTIVITET]: parseAktivitetOppgave,
    [OppgaveType.BEKREFT_BISTAND]: parseBistandOppgave,
    [OppgaveType.BEKREFT_ENDRET_STARTDATO]: parseEndretStartdatoOppgave,
    [OppgaveType.BEKREFT_ENDRET_SLUTTDATO]: parseEndretSluttdatoOppgave,
    [OppgaveType.BEKREFT_ENDRET_PERIODE]: parseEndretPeriodeOppgave,
    [OppgaveType.BEKREFT_AVVIK_REGISTERINNTEKT]: parseAvvikRegisterinntektOppgave,
    [OppgaveType.RAPPORTER_INNTEKT]: parseRapporterInntektOppgave,
    [OppgaveType.SØK_YTELSE]: parseSøkYtelseOppgave,
    [OppgaveType.BEKREFT_OPPHOR_VED_MAKSDATO]: parseOpphørVedMaksdatoOppgave,
} satisfies Record<OppgaveType, OppgaveParser>;

export const parseOppgaver = (oppgaver: BrukerdialogOppgaveDto[]): Oppgave[] =>
    oppgaver.map((oppgave) => {
        const parseOppgave: OppgaveParser | undefined = oppgaveParsers[oppgave.oppgavetype];
        if (!parseOppgave) {
            throw new Error(`Ukjent oppgavetype: ${oppgave.oppgavetype}`);
        }
        return parseOppgave(oppgave);
    });
