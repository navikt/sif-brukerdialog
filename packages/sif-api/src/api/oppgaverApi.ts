import { BrukerdialogOppgave } from '@navikt/ung-brukerdialog-api';
import { handleApiError } from '@navikt/ung-common';

import { Oppgave } from '../types/Oppgave';
import { parseOppgaverElement } from './parse-utils/parseOppgaverElement';

export const hentOppgaver = async (): Promise<Oppgave[]> => {
    try {
        const { data } = await BrukerdialogOppgave.hentAlleOppgaver();
        return parseOppgaverElement(data);
    } catch (e) {
        throw handleApiError(e, 'getDeltakerOppgaver');
    }
};
