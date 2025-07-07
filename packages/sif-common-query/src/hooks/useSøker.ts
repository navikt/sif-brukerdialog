import { useQuery } from '@tanstack/react-query';
import { SØkerController } from '@navikt/k9-brukerdialog-prosessering-api';
import { sifCommonQueryKeys } from '../queryKeys';
import { Søker, søkerResponseSchema } from '../types/søker';

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
        queryFn: async () => {
            const response = await SØkerController.hentSøker();
            return søkerResponseSchema.parse(response.data);
        },
        enabled,
        staleTime: Infinity, // Data er alltid fresh - endrer seg aldri
        gcTime: Infinity, // Hold i cache til appen lukkes
        retry: 1, // Prøv kun én gang ekstra ved feil
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
    });
};
