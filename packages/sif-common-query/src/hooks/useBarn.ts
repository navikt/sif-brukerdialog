import { useQuery } from '@tanstack/react-query';
import { BarnController } from '@navikt/k9-brukerdialog-prosessering-api';
import { sifCommonQueryKeys } from '../queryKeys';
import { barnOppslagListeSchema, BarnOppslag } from '../types/barn';

/**
 * Hook for å hente informasjon om registrerte barn fra k9-brukerdialog-prosessering-api
 *
 * Barndata endrer seg sjelden i løpet av en brukerøkt, så vi bruker maksimal caching:
 * - staleTime: Infinity - Data er alltid fresh
 * - gcTime: Infinity - Holder data i cache til appen lukkes
 * - Ingen refetch på focus/mount/reconnect
 */
export const useBarn = (enabled = true) => {
    return useQuery<BarnOppslag[], Error>({
        queryKey: sifCommonQueryKeys.barn,
        queryFn: async () => {
            const response = await BarnController.hentBarn();
            const data = barnOppslagListeSchema.parse(response.data);
            return data.barn;
        },
        enabled,
        staleTime: Infinity, // Data er alltid fresh - endrer seg sjelden
        gcTime: Infinity, // Hold i cache til appen lukkes
        retry: 1, // Prøv kun én gang ekstra ved feil
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
    });
};
