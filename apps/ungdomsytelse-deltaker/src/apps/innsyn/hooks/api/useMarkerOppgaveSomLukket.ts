import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiError } from '@navikt/ung-common';
import { commonQueries } from '../../../../api/queries/commonQueries';
import { markerOppgaveSomLukket } from '../../api/oppgave/markerOppgaveSomLukket';

export const useMarkerOppgaveSomLukket = () => {
    const queryClient = useQueryClient();
    return useMutation<void, ApiError, string>({
        mutationFn: (oppgaveReferanse) => markerOppgaveSomLukket(oppgaveReferanse),
        onSuccess: () => {
            queryClient.invalidateQueries(commonQueries.deltakelseperioder);
        },
    });
};
