import { fetchSøker, Søker } from '@navikt/sif-common-api';
import { ApiError } from '@navikt/ung-common';
import { useQuery } from '@tanstack/react-query';

import { commonQueryKeys } from '../queries/commonQueries';

/**
 * Henter informasjon om innlogget bruker
 */
export const useSøker = (enabled = true) => {
    return useQuery<Søker, ApiError>({
        queryKey: commonQueryKeys.søker,
        queryFn: () => fetchSøker(),
        enabled,
        staleTime: 1000 * 60 * 20, // 20 minutter
        retry: 1,
        refetchOnWindowFocus: false,
    });
};
