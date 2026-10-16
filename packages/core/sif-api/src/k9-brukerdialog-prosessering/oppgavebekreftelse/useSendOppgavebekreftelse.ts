import type { aktivitetspenger, ungdomsytelse } from '@navikt/k9-brukerdialog-prosessering-api';
import { useMutation } from '@tanstack/react-query';

import { ApiError } from '../../shared/errorHandlers';
import { sendOppgavebekreftelseAktivitetspenger, sendOppgavebekreftelseUngdomsytelse } from './oppgavebekreftelseApi';

/**
 * Oppgavebekreftelse knyttet til ytelsen sin, slik at hver ytelse sender sin egen DTO.
 * Verdiene i `ytelse` er de samme som i OppgaveYtelsetype fra ung-brukerdialog-api, slik at enumen kan sendes inn direkte.
 */
export type YtelseOppgavebekreftelse =
    | { ytelse: 'AKTIVITETSPENGER'; data: aktivitetspenger.AktivitetspengerOppgavebekreftelse }
    | { ytelse: 'UNGDOMSYTELSE'; data: ungdomsytelse.UngdomsytelseOppgavebekreftelse };

export const useSendOppgavebekreftelse = () => {
    return useMutation<void, ApiError, YtelseOppgavebekreftelse>({
        mutationFn: (bekreftelse) => {
            switch (bekreftelse.ytelse) {
                case 'AKTIVITETSPENGER':
                    return sendOppgavebekreftelseAktivitetspenger(bekreftelse.data);
                case 'UNGDOMSYTELSE':
                    return sendOppgavebekreftelseUngdomsytelse(bekreftelse.data);
                default: {
                    const ukjent: never = bekreftelse;
                    throw new Error(`Ukjent ytelse: ${JSON.stringify(ukjent)}`);
                }
            }
        },
    });
};
