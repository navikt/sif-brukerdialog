import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiError } from '@navikt/ung-common';
import { queryKeys } from '../queries/queryKeys';
import { slettDeltaker } from '../api/deltaker/slettDeltaker';

export const useSlettDeltaker = (deltakerId: string) => {
    const queryClient = useQueryClient();

    return useMutation<void, ApiError, { deltakerId: string }>({
        mutationFn: () => slettDeltaker(deltakerId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.finnDeltaker(deltakerId) });
            queryClient.invalidateQueries({ queryKey: queryKeys.deltakelserForDeltaker(deltakerId) });
        },
    });
};
