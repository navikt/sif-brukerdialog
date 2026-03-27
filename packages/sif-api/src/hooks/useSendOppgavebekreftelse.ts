import { UngdomsytelseOppgavebekreftelse } from '@navikt/k9-brukerdialog-prosessering-api';
import { useMutation } from '@tanstack/react-query';

import { sendOppgavebekreftelse } from '../api/sendOppgavebekreftelse';
import { ApiError } from '../utils/errorHandlers';

export const useSendOppgavebekreftelse = () => {
    return useMutation<void, ApiError, UngdomsytelseOppgavebekreftelse>({
        mutationFn: (data) => sendOppgavebekreftelse(data),
    });
};
