import { ApiError } from '@sif/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { slettDeltaker } from '../api/deltaker/slettDeltaker';
import { queryKeys } from '../queries/queryKeys';
import { SlettDeltakerÅrsak } from '../types/SlettDeltakerÅrsaker';
import { AppHendelse } from '../utils/analytics';
import { useAppEventLogger } from '../utils/analyticsHelper';

export const useSlettAktivDeltaker = (deltakerId: string) => {
    const queryClient = useQueryClient();
    const { log } = useAppEventLogger();

    return useMutation<void, ApiError, { deltakerId: string; årsak: SlettDeltakerÅrsak }>({
        mutationFn: () => slettDeltaker(deltakerId),
        onSuccess: async (_, variables) => {
            await log(AppHendelse.aktivDeltakerSlettet, { årsak: variables.årsak });
            queryClient.invalidateQueries({ queryKey: queryKeys.finnDeltaker(deltakerId) });
            queryClient.invalidateQueries({ queryKey: queryKeys.deltakelserForDeltaker(deltakerId) });
        },
    });
};
