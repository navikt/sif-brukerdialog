import { BrukerdialogOppgaveDto, OppgavetypeDataDto } from '@navikt/ung-brukerdialog-api';

import { AndreLivsoppholdsytelserOppgave, ParsedOppgavetype } from '../../../types/Oppgave';
import { getOppgaveBaseProps } from './oppgaveBase';
import { parseSvarPåVarselRespons } from './oppgaveRespons';
import { parseVilkårOppgavetypeData } from './parseVilkarOppgavetypeData';

type AndreLivsoppholdsytelserOppgavetypeData = Extract<
    OppgavetypeDataDto,
    { type: 'ANDRE_LIVSOPPHOLDSYTELSER' | 'ANDRE_LIVSOPPHOLDSYTELSER_OPPHØR' }
>;

/**
 * Backend skiller mellom avslag i en periode og opphør fra en dato, men siden datoene ikke
 * vises i frontend blir de to variantene identiske for oss.
 */
export const parseAndreLivsoppholdsytelserOppgave = (
    oppgave: BrukerdialogOppgaveDto,
): AndreLivsoppholdsytelserOppgave => ({
    ...getOppgaveBaseProps(oppgave),
    parsedOppgavetype: ParsedOppgavetype.BEKREFT_ANDRE_LIVSOPPHOLDSYTELSER,
    oppgavetypeData: parseVilkårOppgavetypeData(
        oppgave,
        oppgave.oppgavetypeData as AndreLivsoppholdsytelserOppgavetypeData,
    ),
    respons: parseSvarPåVarselRespons(oppgave.respons),
});
