import { useQuery } from '@tanstack/react-query';
import { ApiError, DeltakelsePeriode } from '@navikt/ung-common';
import { getAlleMineDeltakelser } from '../deltakelse/getAlleMineDeltakelser';
import { commonQueryKeys } from '../queries/commonQueries';

/**
 * Henter alle deltakelser for innlogget deltaker
 */
export const useDeltakelser = (enabled = true) => {
    return useQuery<DeltakelsePeriode[], ApiError>({
        queryKey: commonQueryKeys.deltakelser,
        queryFn: () => getAlleMineDeltakelser(),
        staleTime: 1000 * 60 * 5, // 5 minutter
        enabled,
        retry: 1,
    });
};
