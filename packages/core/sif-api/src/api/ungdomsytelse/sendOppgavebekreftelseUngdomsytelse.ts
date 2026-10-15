import { ungdomsytelse } from '@navikt/k9-brukerdialog-prosessering-api';
import { commonRequestHeaders } from '@sif/api-client';

import { handleApiError } from '../../utils/errorHandlers';

export const sendOppgavebekreftelseUngdomsytelse = async (
    oppgave: ungdomsytelse.UngdomsytelseOppgavebekreftelse,
): Promise<void> => {
    try {
        await ungdomsytelse.UngdomsytelseController.oppgavebekreftelse({
            body: oppgave,
            headers: commonRequestHeaders,
        });
    } catch (e) {
        throw handleApiError(e, 'sendOppgavebekreftelseUngdomsytelse');
    }
};
