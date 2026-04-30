import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiError } from '@navikt/ung-common';
import { queryKeys } from '../queries/queryKeys';
import { Deltakelse } from '../types/Deltakelse';
import { utvidKvote } from '../api/deltakelse/utvidKvote';

export const useUtvidKvote = ({ deltakelseId, deltakerId }: { deltakelseId: string; deltakerId: string }) => {
    const queryClient = useQueryClient();

    return useMutation<Deltakelse, ApiError, any>({
        mutationFn: utvidKvote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.deltakelserForDeltaker(deltakerId) });
            queryClient.invalidateQueries({ queryKey: queryKeys.deltakelseHistorikk(deltakelseId) });
        },
    });
};
