import { markerOppgaveSomLukket } from '@innsyn/api/oppgave/markerOppgaveSomLukket';
import { ApiError } from '@navikt/ung-common';
import { commonQueries } from '@shared/api/queries/commonQueries';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useMarkerOppgaveSomLukket = () => {
    const queryClient = useQueryClient();
    return useMutation<void, ApiError, string>({
        mutationFn: (oppgaveReferanse) => markerOppgaveSomLukket(oppgaveReferanse),
        onSuccess: () => {
            queryClient.invalidateQueries(commonQueries.deltakelseperioder);
        },
    });
};
