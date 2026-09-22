import { BrukerdialogOppgaveDto, OppgavetypeDataDto } from '@navikt/ung-brukerdialog-api';

import { BostedVilkårOppgave, ParsedOppgavetype } from '../../../types/Oppgave';
import { getOppgaveBaseProps } from './oppgaveBase';
import { parseSvarPåVarselRespons } from './oppgaveRespons';
import { parseVilkårOppgavetypeData } from './parseVilkarOppgavetypeData';

type BostedOppgavetypeData = Extract<OppgavetypeDataDto, { type: 'BOSTED' | 'BOSTED_OPPHØR' }>;

/**
 * Backend skiller mellom BOSTED (avslag i en periode) og BOSTED_OPPHØR (opphør fra en dato),
 * men siden datoene ikke vises i frontend blir de to variantene identiske for oss.
 */
export const parseBostedOppgave = (oppgave: BrukerdialogOppgaveDto): BostedVilkårOppgave => ({
    ...getOppgaveBaseProps(oppgave),
    parsedOppgavetype: ParsedOppgavetype.BEKREFT_BOSTED,
    oppgavetypeData: parseVilkårOppgavetypeData(oppgave, oppgave.oppgavetypeData as BostedOppgavetypeData),
    respons: parseSvarPåVarselRespons(oppgave.respons),
});
