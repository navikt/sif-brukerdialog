import { BrukerdialogOppgaveDto, OppgavetypeDataDto } from '@sif/ung-brukerdialog-api';

import { BistandVilkårOppgave, ParsedOppgavetype } from '../../Oppgave';
import { getOppgaveBaseProps } from './oppgaveBase';
import { parseSvarPåVarselRespons } from './oppgaveRespons';
import { parseVilkårOppgavetypeData } from './parseVilkarOppgavetypeData';

type BistandOppgavetypeData = Extract<OppgavetypeDataDto, { type: 'BISTAND' | 'BISTAND_OPPHØR' }>;

/**
 * Backend skiller mellom avslag i en periode og opphør fra en dato, men siden datoene ikke
 * vises i frontend blir de to variantene identiske for oss.
 */
export const parseBistandOppgave = (oppgave: BrukerdialogOppgaveDto): BistandVilkårOppgave => ({
    ...getOppgaveBaseProps(oppgave),
    parsedOppgavetype: ParsedOppgavetype.BEKREFT_BISTAND,
    oppgavetypeData: parseVilkårOppgavetypeData(oppgave, oppgave.oppgavetypeData as BistandOppgavetypeData),
    respons: parseSvarPåVarselRespons(oppgave.respons),
});
