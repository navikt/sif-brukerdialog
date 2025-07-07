import { useQuery } from '@tanstack/react-query';
import {
    ArbeidsgivereController,
    ArbeidsgivereDto,
    zHentArbeidsgivereResponse,
} from '@navikt/k9-brukerdialog-prosessering-api';
import { sifCommonQueryKeys } from '../queryKeys';

/**
 * Hook for å hente informasjon om arbeidsgivere fra k9-brukerdialog-prosessering-api
 *
 * Arbeidsgiverdata endrer seg sjelden i løpet av en brukerøkt, så vi bruker maksimal caching:
 * - staleTime: Infinity - Data er alltid fresh
 * - gcTime: Infinity - Holder data i cache til appen lukkes
 * - Ingen refetch på focus/mount/reconnect
 */
export const useArbeidsgivere = (
    fraOgMed: string,
    tilOgMed: string,
    options?: {
        inkluderAlleAnsettelsesperioder?: boolean;
        frilansoppdrag?: boolean;
        privateArbeidsgivere?: boolean;
        enabled?: boolean;
    },
) => {
    const { enabled = true, ...queryOptions } = options || {};

    return useQuery<ArbeidsgivereDto, Error>({
        queryKey: [...sifCommonQueryKeys.arbeidsgivere, fraOgMed, tilOgMed, queryOptions],
        queryFn: async () => {
            const response = await ArbeidsgivereController.hentArbeidsgivere({
                query: {
                    fra_og_med: fraOgMed,
                    til_og_med: tilOgMed,
                    ...queryOptions,
                },
            });
            return zHentArbeidsgivereResponse.parse(response.data);
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
