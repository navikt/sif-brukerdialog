import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiError } from '@navikt/ung-common';
import { slettDeltakelse } from '../api/deltakelse/slettDeltakelse';
import { queries } from '../queries/queryKeys';

export const useSlettDeltakelse = (deltakerId: string, deltakelseId: string) => {
    const queryClient = useQueryClient();

    return useMutation<void, ApiError, { deltakelseId: string }>({
        mutationFn: () => slettDeltakelse(deltakelseId),
        onSuccess: () => {
            queryClient.invalidateQueries(queries.finnDeltaker(deltakerId));
            queryClient.invalidateQueries(queries.deltakelserForDeltaker(deltakerId));
        },
        onError: (error) => {
            console.error('Error while deleting participation:', error);
        },
    });
};
