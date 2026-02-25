import { fetchSøker, Søker } from '@navikt/sif-common-api';
import { useQuery } from '@tanstack/react-query';

import { commonQueryKeys } from '../queries/commonQueries';
import { AxiosError } from 'axios';

/**
 * Henter informasjon om innlogget bruker
 */
export const useSøker = (enabled = true) => {
    return useQuery<Søker, AxiosError>({
        queryKey: commonQueryKeys.søker,
        queryFn: () => fetchSøker(),
        enabled,
        staleTime: 1000 * 60 * 20, // 20 minutter
        retry: 1,
        refetchOnWindowFocus: false,
    });
};
