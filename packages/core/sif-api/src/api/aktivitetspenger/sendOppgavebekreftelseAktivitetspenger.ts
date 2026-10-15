import { aktivitetspenger } from '@navikt/k9-brukerdialog-prosessering-api';
import { commonRequestHeaders } from '@sif/api-client';

import { handleApiError } from '../../utils/errorHandlers';

export const sendOppgavebekreftelseAktivitetspenger = async (
    oppgave: aktivitetspenger.AktivitetspengerOppgavebekreftelse,
): Promise<void> => {
    try {
        await aktivitetspenger.AktivitetspengerController.oppgavebekreftelse({
            body: oppgave,
            headers: commonRequestHeaders,
        });
    } catch (e) {
        throw handleApiError(e, 'sendOppgavebekreftelseAktivitetspenger');
    }
};
