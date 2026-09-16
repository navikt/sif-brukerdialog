import { BrukerdialogOppgave, OppgaveYtelsetype } from '@navikt/ung-brukerdialog-api';

import { Oppgave } from '../types/Oppgave';
import { handleApiError } from '../utils/errorHandlers';
import { parseOppgaver } from './parse-utils/parseOppgaver';

export const hentOppgaver = async (ytelsetype: OppgaveYtelsetype): Promise<Oppgave[]> => {
    try {
        const { data } = await BrukerdialogOppgave.hentAlleOppgaver({ query: { ytelsetype } });
        return parseOppgaver(ytelsetype, data);
    } catch (e) {
        throw handleApiError(e, `hentOppgaver-${ytelsetype}`);
    }
};
