import type { aktivitetspenger, ungdomsytelse } from '@navikt/k9-brukerdialog-prosessering-api';
import { OppgaveYtelsetype } from '@navikt/ung-brukerdialog-api';
import { useMutation } from '@tanstack/react-query';

import { sendOppgavebekreftelseAktivitetspenger } from '../api/aktivitetspenger/sendOppgavebekreftelseAktivitetspenger';
import { sendOppgavebekreftelseUngdomsytelse } from '../api/ungdomsytelse/sendOppgavebekreftelseUngdomsytelse';
import { ApiError } from '../utils/errorHandlers';

/** Oppgavebekreftelse knyttet til ytelsen sin, slik at hver ytelse sender sin egen DTO. */
export type YtelseOppgavebekreftelse =
    | { ytelse: OppgaveYtelsetype.AKTIVITETSPENGER; data: aktivitetspenger.AktivitetspengerOppgavebekreftelse }
    | { ytelse: OppgaveYtelsetype.UNGDOMSYTELSE; data: ungdomsytelse.UngdomsytelseOppgavebekreftelse };

export const useSendOppgavebekreftelse = () => {
    return useMutation<void, ApiError, YtelseOppgavebekreftelse>({
        mutationFn: (bekreftelse) => {
            const ytelse = bekreftelse.ytelse;
            switch (bekreftelse.ytelse) {
                case OppgaveYtelsetype.AKTIVITETSPENGER:
                    return sendOppgavebekreftelseAktivitetspenger(bekreftelse.data);
                case OppgaveYtelsetype.UNGDOMSYTELSE:
                    return sendOppgavebekreftelseUngdomsytelse(bekreftelse.data);
                default: {
                    const _exhaustive: never = bekreftelse;
                    void _exhaustive;
                    throw new Error(`Ukjent OppgaveYtelsetype: ${String(ytelse)}`);
                }
            }
        },
    });
};
