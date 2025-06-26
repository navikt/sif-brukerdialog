import {
    UngdomsytelseController as UngdomsytelseControllerService,
    UngdomsytelseOppgavebekreftelse,
} from '@navikt/k9-brukerdialog-prosessering-api';
import { commonRequestHeader, handleApiError } from '@navikt/ung-common';

export const sendOppgavebekreftelse = async (oppgave: UngdomsytelseOppgavebekreftelse): Promise<void> => {
    try {
        await UngdomsytelseControllerService.oppgavebekreftelse({ body: oppgave, headers: commonRequestHeader });
        return Promise.resolve();
    } catch (e) {
        throw handleApiError(e, 'sendOppgavebekreftelse');
    }
};
