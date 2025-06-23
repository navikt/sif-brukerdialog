import { useQuery } from '@tanstack/react-query';
import { fetchSøker, Søker } from '@navikt/sif-common-api';
import { ApiError } from '@navikt/ung-common';
import { commonQueryKeys } from '../queries/commonQueries';

/**
 * Henter informasjon om innlogget bruker
 */
export const useSøker = (enabled = true) => {
    return useQuery<Søker, ApiError>({
        queryKey: commonQueryKeys.søker,
        queryFn: () => fetchSøker(),
        enabled,
        staleTime: 1000 * 60 * 5, // 5 minutter
        retry: 1,
    });
};
