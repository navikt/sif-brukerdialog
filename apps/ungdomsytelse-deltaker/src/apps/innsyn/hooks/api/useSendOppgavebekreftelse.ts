import { sendOppgavebekreftelse } from '@innsyn/api/oppgave/sendOppgavebekreftelse';
import { UngdomsytelseOppgavebekreftelse } from '@navikt/k9-brukerdialog-prosessering-api';
import { ApiError } from '@navikt/ung-common';
import { commonQueries } from '@shared/api/queries/commonQueries';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { logApiErrorFaro } from '../../utils/apiErrorLogger';

export const useSendOppgavebekreftelse = () => {
    const queryClient = useQueryClient();

    return useMutation<void, ApiError, UngdomsytelseOppgavebekreftelse>({
        mutationFn: (data) => sendOppgavebekreftelse(data),
        onSuccess: () => {
            // Umiddelbar invalidering for UI responsivitet
            queryClient.invalidateQueries(commonQueries.deltakelseperioder);

            // Backup refetch etter delay for å sikre oppdaterte data fra backend
            setTimeout(() => {
                queryClient.refetchQueries(commonQueries.deltakelseperioder);
            }, 3000);
        },
        onError: (error) => logApiErrorFaro('useSendOppgavebekreftelse', error),
    });
};
