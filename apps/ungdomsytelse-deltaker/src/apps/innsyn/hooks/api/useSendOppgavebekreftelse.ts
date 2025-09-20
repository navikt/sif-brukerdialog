import { sendOppgavebekreftelse } from '@innsyn/api/oppgave/sendOppgavebekreftelse';
import { UngdomsytelseOppgavebekreftelse } from '@navikt/k9-brukerdialog-prosessering-api';
import { ApiError } from '@navikt/ung-common';
import { commonQueries } from '@shared/api/queries/commonQueries';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useSendOppgavebekreftelse = () => {
    const queryClient = useQueryClient();
    return useMutation<void, ApiError, UngdomsytelseOppgavebekreftelse>({
        mutationFn: (data) => sendOppgavebekreftelse(data),
        onSuccess: () => {
            queryClient.invalidateQueries(commonQueries.deltakelseperioder);
        },
    });
};
