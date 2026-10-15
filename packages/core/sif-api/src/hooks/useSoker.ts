import { useQuery } from '@tanstack/react-query';

import { hentSøker } from '../api/sokerApi';
import { sifApiQueryKeys } from '../queryKeys';
import { Søker } from '../types/Soker';
import { ApiError } from '../utils/errorHandlers';

/**
 * Hook for å hente informasjon om innlogget bruker fra k9-brukerdialog-prosessering-api
 *
 * Søkerdata endrer seg ikke i løpet av en brukerøkt, så dataene regnes aldri som utdaterte (staleTime: Infinity).
 */
export const useSøker = (enabled = true) => {
    return useQuery<Søker, ApiError>({
        queryKey: sifApiQueryKeys.søker,
        queryFn: hentSøker,
        enabled,
        staleTime: Infinity,
        retry: 1,
    });
};
