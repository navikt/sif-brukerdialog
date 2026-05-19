import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiError } from '@navikt/ung-common';
import { queryKeys } from '../queries/queryKeys';
import { Deltakelse } from '../types/Deltakelse';
import { forlengPeriode } from '../api/deltakelse/forlengPeriode';

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
