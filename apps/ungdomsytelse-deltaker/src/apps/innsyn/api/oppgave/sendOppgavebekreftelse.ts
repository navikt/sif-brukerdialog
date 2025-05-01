import {
    UngdomsytelseControllerService,
    UngdomsytelseOppgavebekreftelse,
} from '@navikt/k9-brukerdialog-prosessering-api';
import { handleApiError } from '@navikt/ung-common';

const k9RequestHeader = {} as any;

export const sendOppgavebekreftelse = async (oppgave: UngdomsytelseOppgavebekreftelse): Promise<void> => {
    try {
        await UngdomsytelseControllerService.oppgavebekreftelse({ body: oppgave, headers: k9RequestHeader });
        return Promise.resolve();
    } catch (e) {
        throw handleApiError(e, 'sendOppgavebekreftelse');
    }
};
