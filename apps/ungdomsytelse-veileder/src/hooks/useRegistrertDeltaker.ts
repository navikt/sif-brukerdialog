import { useQuery, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../queries/queryKeys';
import { getDeltakerById } from '../api/deltaker/getDeltaker';
import { ApiError, Deltaker } from '@navikt/ung-common';

/**
 * Henter en registrert deltaker basert på deltakerId (UUID).
 * @param deltakerId UUID for deltaker
 * @param enabled Optional: default true
 */
export const useRegistrertDeltaker = (deltakerId: string, enabled = true) => {
    const queryClient = useQueryClient();
    return useQuery<Deltaker, ApiError>({
        queryKey: queryKeys.deltakerById(deltakerId),
        queryFn: () => getDeltakerById(deltakerId),
        enabled: enabled && !!deltakerId,
        initialData: () => queryClient.getQueryData(['deltaker', deltakerId]), // Bruk cache hvis tilgjengelig
        retry: 1,
    });
};
