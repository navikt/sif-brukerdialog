import { BrukerdialogOppgave } from '@navikt/ung-brukerdialog-api';
import { handleApiError } from '@navikt/ung-common';

import { logApiErrorFaro } from '../../apps/innsyn/utils/apiErrorLogger';
import { Oppgave } from '../../types/Oppgave';
import { parseOppgaverElement } from '../parse-utils/parseOppgaverElement';

export const getDeltakerOppgaver = async (): Promise<Oppgave[]> => {
    try {
        const { data } = await BrukerdialogOppgave.hentAlleOppgaver();
        return parseOppgaverElement(data);
    } catch (e) {
        const parsedApiError = handleApiError(e, 'getDeltakerOppgaver');
        logApiErrorFaro('getDeltakerOppgaver', parsedApiError);
        throw parsedApiError;
    }
};
