import { useQuery } from '@tanstack/react-query';
import { sifCommonQueryKeys } from '../queryKeys';
import { Søker } from '../types/søker';
import { hentSøker } from '../api/søkerApi';

/**
 * Hook for å hente informasjon om innlogget bruker fra k9-brukerdialog-prosessering-api
 *
 * Søkerdata endrer seg aldri i løpet av en brukerøkt, så vi bruker maksimal caching:
 * - staleTime: Infinity - Data er alltid fresh
 * - gcTime: Infinity - Holder data i cache til appen lukkes
 * - Ingen refetch på focus/mount/reconnect
 */
export const useSøker = (enabled = true) => {
    return useQuery<Søker, Error>({
        queryKey: sifCommonQueryKeys.søker,
        queryFn: hentSøker,
        enabled,
        staleTime: Infinity, // Data er alltid fresh - endrer seg aldri
        retry: 1,
    });
};
