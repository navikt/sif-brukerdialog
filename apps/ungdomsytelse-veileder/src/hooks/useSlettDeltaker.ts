import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiError } from '@navikt/ung-common';
import { slettDeltaker } from '../api/deltaker/slettDeltaker';
import { queryKeys } from '../queries/queryKeys';
import { AppHendelse } from '../utils/analytics';
import { useAppEventLogger } from '../utils/analyticsHelper';

export const useSlettDeltaker = (deltakerId: string) => {
    const queryClient = useQueryClient();
    const { log } = useAppEventLogger();

    return useMutation<void, ApiError, { deltakerId: string }>({
        mutationFn: () => slettDeltaker(deltakerId),
        onSuccess: async () => {
            await log(AppHendelse.deltakerSlettet);
            queryClient.invalidateQueries({ queryKey: queryKeys.finnDeltaker(deltakerId) });
            queryClient.invalidateQueries({ queryKey: queryKeys.deltakelserForDeltaker(deltakerId) });
        },
    });
};
