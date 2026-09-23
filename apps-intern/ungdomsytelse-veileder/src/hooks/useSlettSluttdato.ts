import { ApiError } from '@sif/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { slettSluttdato } from '../api/deltaker/slettSluttdato';
import { queryKeys } from '../queries/queryKeys';
import { AppHendelse } from '../utils/analytics';
import { useAppEventLogger } from '../utils/analyticsHelper';

export const useSlettSluttdato = (deltakerId: string, deltakelseId: string) => {
    const queryClient = useQueryClient();
    const { log } = useAppEventLogger();

    return useMutation<void, ApiError, { deltakelseId: string }>({
        mutationFn: ({ deltakelseId: id }) => slettSluttdato(id),
        onSuccess: async () => {
            await log(AppHendelse.sluttdatoSlettet);
            queryClient.invalidateQueries({ queryKey: queryKeys.deltakelserForDeltaker(deltakerId) });
            queryClient.invalidateQueries({ queryKey: queryKeys.deltakelseHistorikk(deltakelseId) });
        },
    });
};
