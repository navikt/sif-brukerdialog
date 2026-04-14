import { UngdomsytelseOppgavebekreftelse } from '@navikt/k9-brukerdialog-prosessering-api/src/generated/ungdomsytelse';
import { OppgaveYtelsetype } from '@navikt/ung-brukerdialog-api';
import { useMutation } from '@tanstack/react-query';

import { sendOppgavebekreftelseAktivitetspenger } from '../api/aktivitetspenger/sendOppgavebekreftelseAktivitetspenger';
import { sendOppgavebekreftelseUngdomsytelse } from '../api/ungdomsytelse/sendOppgavebekreftelseUngdomsytelse';
import { ApiError } from '../utils/errorHandlers';

export const useSendOppgavebekreftelse = (ytelse: OppgaveYtelsetype) => {
    return useMutation<void, ApiError, UngdomsytelseOppgavebekreftelse>({
        mutationFn: (data) => {
            switch (ytelse) {
                case OppgaveYtelsetype.AKTIVITETSPENGER:
                    return sendOppgavebekreftelseAktivitetspenger(data);
                case OppgaveYtelsetype.UNGDOMSYTELSE:
                    return sendOppgavebekreftelseUngdomsytelse(data);
            }
        },
    });
};
