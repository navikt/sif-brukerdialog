import { useQuery } from '@tanstack/react-query';
import { sifCommonQueryKeys } from '../queryKeys';
import { Arbeidsgivere } from '../types/Arbeidsgivere';
import { hentArbeidsgivere } from '../api/arbeidsgivereApi';

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

    return useQuery<Arbeidsgivere, Error>({
        queryKey: [...sifCommonQueryKeys.arbeidsgivere, fraOgMed, tilOgMed, queryOptions],
        queryFn: () => hentArbeidsgivere(fraOgMed, tilOgMed, queryOptions),
        enabled,
        staleTime: Infinity, // Data er alltid fresh - endrer seg sjelden
        retry: 1,
    });
};
