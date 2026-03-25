import { BrukerdialogOppgave, OppgaveYtelsetype } from '@navikt/ung-brukerdialog-api';

import { Oppgave } from '../types/Oppgave';
import { handleApiError } from '../utils/errorHandlers';
import { parseOppgaverElement } from './parse-utils/parseOppgaverElement';

export const hentOppgaver = async (ytelsetype: OppgaveYtelsetype): Promise<Oppgave[]> => {
    try {
        const { data } = await BrukerdialogOppgave.hentAlleOppgaver({ query: { ytelsetype } });
        return parseOppgaverElement(data);
    } catch (e) {
        throw handleApiError(e, 'getDeltakerOppgaver');
    }
};
