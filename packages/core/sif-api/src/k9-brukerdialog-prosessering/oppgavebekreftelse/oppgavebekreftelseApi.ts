import { commonRequestHeaders } from '@sif/api-client';
import { aktivitetspenger, ungdomsytelse } from '@sif/k9-brukerdialog-prosessering-api';

import { handleApiError } from '../../shared/errorHandlers';

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
