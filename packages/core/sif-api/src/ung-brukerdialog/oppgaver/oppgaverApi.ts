import { BrukerdialogOppgave, OppgaveYtelsetype } from '@navikt/ung-brukerdialog-api';

import { handleApiError } from '../../shared/errorHandlers';
import { Oppgave } from './Oppgave';
import { parseOppgaver } from './parse/parseOppgaver';

export const hentOppgaver = async (ytelsetype: OppgaveYtelsetype): Promise<Oppgave[]> => {
    try {
        const { data } = await BrukerdialogOppgave.hentAlleOppgaver({ query: { ytelsetype } });
        return parseOppgaver(data);
    } catch (e) {
        throw handleApiError(e, `hentOppgaver-${ytelsetype}`);
    }
};
