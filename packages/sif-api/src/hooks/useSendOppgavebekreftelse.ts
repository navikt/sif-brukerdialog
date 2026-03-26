import { UngdomsytelseOppgavebekreftelse } from '@navikt/k9-brukerdialog-prosessering-api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { sendOppgavebekreftelse } from '../api/sendOppgavebekreftelse';
import { sifApiQueryKeys } from '../queryKeys';
import { ApiError } from '../utils/errorHandlers';

export const useSendOppgavebekreftelse = () => {
    const queryClient = useQueryClient();

    return useMutation<void, ApiError, UngdomsytelseOppgavebekreftelse>({
        mutationFn: (data) => sendOppgavebekreftelse(data),
        onSuccess: () => {
            // Umiddelbar invalidering for UI responsivitet
            queryClient.invalidateQueries({ queryKey: sifApiQueryKeys.oppgaver });
            /** Backend oppdateres ikke med en gang, så vi henter deltakelsesperiodene på nytt etter noen sekunder */
            setTimeout(() => {
                queryClient.refetchQueries({ queryKey: sifApiQueryKeys.oppgaver });
            }, 3000);
        },
    });
};
