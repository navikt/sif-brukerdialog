import { useQuery } from '@tanstack/react-query';
import { sifCommonQueryKeys } from '../queryKeys';
import { RegistrertBarn } from '../types/_Barn';
import { hentBarn } from '../api/barnApi';

/**
 * Hook for å hente informasjon om registrerte barn fra k9-brukerdialog-prosessering-api
 *
 * Barndata endrer seg sjelden i løpet av en brukerøkt, så vi bruker maksimal caching:
 * - staleTime: Infinity - Data er alltid fresh
 * - gcTime: Infinity - Holder data i cache til appen lukkes
 * - Ingen refetch på focus/mount/reconnect
 */
export const useBarn = (enabled = true) => {
    return useQuery<RegistrertBarn[], Error>({
        queryKey: sifCommonQueryKeys.barn,
        queryFn: hentBarn,
        enabled,
        staleTime: Infinity, // Data er alltid fresh - endrer seg sjelden
        retry: 1,
    });
};
