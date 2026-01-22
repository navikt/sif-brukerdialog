import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiError } from '@navikt/ung-common';
import { slettDeltaker } from '../api/deltaker/slettDeltaker';
import { queryKeys } from '../queries/queryKeys';

export const useSlettNyDeltaker = (deltakerId: string) => {
    const queryClient = useQueryClient();

    return useMutation<void, ApiError, { deltakerId: string }>({
        mutationFn: () => slettDeltaker(deltakerId),
        onSuccess: async () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.finnDeltaker(deltakerId) });
            queryClient.invalidateQueries({ queryKey: queryKeys.deltakelserForDeltaker(deltakerId) });
        },
    });
};
