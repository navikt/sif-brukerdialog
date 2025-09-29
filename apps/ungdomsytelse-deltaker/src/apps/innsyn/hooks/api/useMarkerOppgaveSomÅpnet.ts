import { markerOppgaveSomÅpnet } from '@innsyn/api/oppgave/markerOppgaveSomÅpnet';
import { ApiError } from '@navikt/ung-common';
import { commonQueries } from '@shared/api/queries/commonQueries';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { logApiErrorFaro } from '../../utils/apiErrorLogger';

export const useMarkerOppgaveSomÅpnet = () => {
    const queryClient = useQueryClient();
    return useMutation<void, ApiError, string>({
        mutationFn: (oppgaveReferanse) => markerOppgaveSomÅpnet(oppgaveReferanse),
        onSuccess: () => {
            queryClient.invalidateQueries(commonQueries.deltakelseperioder);
        },
        onError: (error) => logApiErrorFaro('useMarkerOppgaveSomÅpnet', error),
    });
};
