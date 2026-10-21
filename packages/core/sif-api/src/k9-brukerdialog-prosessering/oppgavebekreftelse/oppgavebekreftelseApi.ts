import { commonRequestHeaders } from '@sif/api-client';
import { aktivitetspenger, ungdomsytelse } from '@sif/k9-brukerdialog-prosessering-api';

import { handleApiError } from '../../shared/errorHandlers';

/**
 * Oppgavebekreftelse knyttet til ytelsen sin, slik at hver ytelse sender sin egen DTO.
 * Verdiene i `ytelse` er de samme som i OppgaveYtelsetype fra ung-brukerdialog-api, slik at enumen kan sendes inn direkte.
 */
export type YtelseOppgavebekreftelse =
    | { ytelse: 'AKTIVITETSPENGER'; data: aktivitetspenger.AktivitetspengerOppgavebekreftelse }
    | { ytelse: 'UNGDOMSYTELSE'; data: ungdomsytelse.UngdomsytelseOppgavebekreftelse };

export const sendOppgavebekreftelse = async ({ ytelse, data }: YtelseOppgavebekreftelse): Promise<void> => {
    try {
        if (ytelse === 'AKTIVITETSPENGER') {
            await aktivitetspenger.AktivitetspengerController.oppgavebekreftelse({
                body: data,
                headers: commonRequestHeaders,
            });
        } else if (ytelse === 'UNGDOMSYTELSE') {
            await ungdomsytelse.UngdomsytelseController.oppgavebekreftelse({
                body: data,
                headers: commonRequestHeaders,
            });
        } else {
            const ukjent: never = ytelse;
            throw new Error(`Ukjent ytelse: ${ukjent}`);
        }
    } catch (e) {
        throw handleApiError(e, `sendOppgavebekreftelse-${ytelse}`);
    }
};
