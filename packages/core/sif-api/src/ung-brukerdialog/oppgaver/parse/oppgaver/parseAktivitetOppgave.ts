import { BrukerdialogOppgaveDto, OppgavetypeDataDto } from '@sif/ung-brukerdialog-api';

import { AktivitetVilkårOppgave, ParsedOppgavetype } from '../../Oppgave';
import { getOppgaveBaseProps } from './oppgaveBase';
import { parseSvarPåVarselRespons } from './oppgaveRespons';
import { parseVilkårOppgavetypeData } from './parseVilkarOppgavetypeData';

type AktivitetOppgavetypeData = Extract<OppgavetypeDataDto, { type: 'AKTIVITET' | 'AKTIVITET_OPPHØR' }>;

/**
 * Backend skiller mellom avslag i en periode og opphør fra en dato, men siden datoene ikke
 * vises i frontend blir de to variantene identiske for oss.
 */
export const parseAktivitetOppgave = (oppgave: BrukerdialogOppgaveDto): AktivitetVilkårOppgave => ({
    ...getOppgaveBaseProps(oppgave),
    parsedOppgavetype: ParsedOppgavetype.BEKREFT_AKTIVITET,
    oppgavetypeData: parseVilkårOppgavetypeData(oppgave, oppgave.oppgavetypeData as AktivitetOppgavetypeData),
    respons: parseSvarPåVarselRespons(oppgave.respons),
});
