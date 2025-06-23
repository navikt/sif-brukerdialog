import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UngdomsytelseOppgavebekreftelse } from '@navikt/k9-brukerdialog-prosessering-api';
import { ApiError } from '@navikt/ung-common';
import { commonQueries } from '../../../../api/queries/commonQueries';
import { sendOppgavebekreftelse } from '../../api/oppgave/sendOppgavebekreftelse';

export const useSendOppgavebekreftelse = () => {
    const queryClient = useQueryClient();
    return useMutation<void, ApiError, UngdomsytelseOppgavebekreftelse>({
        mutationFn: (data) => sendOppgavebekreftelse(data),
        onSuccess: () => {
            queryClient.invalidateQueries(commonQueries.deltakelseperioder);
        },
    });
};
