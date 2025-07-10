import { ungdomsytelse } from '@navikt/k9-brukerdialog-prosessering-api';
import { commonRequestHeader, handleApiError } from '@navikt/ung-common';

export const sendOppgavebekreftelse = async (oppgave: ungdomsytelse.UngdomsytelseOppgavebekreftelse): Promise<void> => {
    try {
        await ungdomsytelse.UngdomsytelseController.oppgavebekreftelse({ body: oppgave, headers: commonRequestHeader });
        return Promise.resolve();
    } catch (e) {
        throw handleApiError(e, 'sendOppgavebekreftelse');
    }
};
