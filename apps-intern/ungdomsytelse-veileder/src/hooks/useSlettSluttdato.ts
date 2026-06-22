import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiError } from '@navikt/ung-common';
import { queryKeys } from '../queries/queryKeys';
import { AppHendelse } from '../utils/analytics';
import { useAppEventLogger } from '../utils/analyticsHelper';
import { slettSluttdato } from '../api/deltaker/slettSluttdato';

export const useSlettSluttdato = (deltakerId: string, deltakelseId: string) => {
    const queryClient = useQueryClient();
    const { log } = useAppEventLogger();

    return useMutation<void, ApiError, { deltakelseId: string }>({
        mutationFn: () => slettSluttdato(deltakelseId),
        onSuccess: async () => {
            await log(AppHendelse.sluttdatoSlettet);
            queryClient.invalidateQueries({ queryKey: queryKeys.deltakelserForDeltaker(deltakerId) });
            queryClient.invalidateQueries({ queryKey: queryKeys.deltakelseHistorikk(deltakelseId) });
        },
    });
};
