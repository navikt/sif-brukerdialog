import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiError } from '@navikt/ung-common';
import { commonQueries } from '../../../../api/queries/commonQueries';
import { markerOppgaveSomÅpnet } from '../../api/oppgave/markerOppgaveSomÅpnet';

export const useMarkerOppgaveSomÅpnet = () => {
    const queryClient = useQueryClient();
    return useMutation<void, ApiError, string>({
        mutationFn: (oppgaveReferanse) => markerOppgaveSomÅpnet(oppgaveReferanse),
        onSuccess: () => {
            queryClient.invalidateQueries(commonQueries.deltakelseperioder);
        },
    });
};
