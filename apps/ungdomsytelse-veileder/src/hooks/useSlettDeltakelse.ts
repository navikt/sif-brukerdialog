import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiError } from '@navikt/ung-common';
import { slettDeltakelse } from '../api/deltakelse/slettDeltakelse';

export const useSlettDeltakelse = (deltakelseId: string) => {
    const queryClient = useQueryClient();

    return useMutation<void, ApiError, { deltakelseId: string }>({
        mutationFn: () => slettDeltakelse(deltakelseId),
        onSuccess: () => {
            queryClient.resetQueries();
        },
    });
};
