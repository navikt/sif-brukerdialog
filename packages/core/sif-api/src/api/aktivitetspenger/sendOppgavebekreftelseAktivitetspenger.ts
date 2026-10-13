import { aktivitetspenger } from '@navikt/k9-brukerdialog-prosessering-api';

import { handleApiError } from '../../utils/errorHandlers';
import { commonRequestHeader } from '../../utils/initApiClient';

export const sendOppgavebekreftelseAktivitetspenger = async (
    oppgave: aktivitetspenger.AktivitetspengerOppgavebekreftelse,
): Promise<void> => {
    try {
        await aktivitetspenger.AktivitetspengerController.oppgavebekreftelse({
            body: oppgave,
            headers: commonRequestHeader,
        });
    } catch (e) {
        throw handleApiError(e, 'sendOppgavebekreftelseAktivitetspenger');
    }
};
