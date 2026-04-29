import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiError } from '@navikt/ung-common';
import { queryKeys } from '../queries/queryKeys';
import { Deltakelse } from '../types/Deltakelse';
import { utvidDeltakelse } from '../api/deltakelse/utvidDeltakelse';

export const useUtvidDeltakelse = ({ deltakelseId, deltakerId }: { deltakelseId: string; deltakerId: string }) => {
    const queryClient = useQueryClient();

    return useMutation<Deltakelse, ApiError, any>({
        mutationFn: utvidDeltakelse,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.deltakelserForDeltaker(deltakerId) });
            queryClient.invalidateQueries({ queryKey: queryKeys.deltakelseHistorikk(deltakelseId) });
        },
    });
};
