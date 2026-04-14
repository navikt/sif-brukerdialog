import { ungdomsytelse } from '@navikt/k9-brukerdialog-prosessering-api';

import { handleApiError } from '../../utils/errorHandlers';
import { commonRequestHeader } from '../../utils/initApiClient';

export const sendOppgavebekreftelseAktivitetspenger = async (
    oppgave: ungdomsytelse.UngdomsytelseOppgavebekreftelse,
): Promise<void> => {
    try {
        await ungdomsytelse.UngdomsytelseController.oppgavebekreftelse({ body: oppgave, headers: commonRequestHeader });
    } catch (e) {
        throw handleApiError(e, 'sendOppgavebekreftelseAktivitetspenger');
    }
};
