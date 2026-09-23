import { ApiError } from '@sif/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { forlengPeriode } from '../api/deltakelse/forlengPeriode';
import { queryKeys } from '../queries/queryKeys';
import { Deltakelse } from '../types/Deltakelse';

export const useForlengPeriode = ({ deltakelseId, deltakerId }: { deltakelseId: string; deltakerId: string }) => {
    const queryClient = useQueryClient();

    return useMutation<Deltakelse, ApiError, string>({
        mutationFn: forlengPeriode,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.deltakelserForDeltaker(deltakerId) });
            queryClient.invalidateQueries({ queryKey: queryKeys.deltakelseHistorikk(deltakelseId) });
        },
    });
};
