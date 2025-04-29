import { useQuery } from '@tanstack/react-query';
import { ApiError, DeltakelsePeriode } from '@navikt/ung-common';
import { getAlleMineDeltakelser } from '../api/deltakelse/getAlleMineDeltakelser';
import { queryKeys } from '../queries/queryKeys';

/**
 * Henter alle deltakelser for innlogget deltaker
 */
export const useDeltakelser = (enabled = true) => {
    return useQuery<DeltakelsePeriode[], ApiError>({
        queryKey: queryKeys.deltakelser,
        queryFn: () => getAlleMineDeltakelser(),
        staleTime: 1000 * 60 * 5, // 5 minutter
        enabled,
        retry: 1,
    });
};
