import { useQuery } from '@tanstack/react-query';
import { BarnOppslag } from '@navikt/sif-common-query';
import { GyldigeVedtak } from '../../types/GyldigeVedtak';
import { hentGyldigeVedtakForRegistrerteBarn } from '../hent-siste-gyldige-vedtak/hentSisteGyldigeVedtak';

/**
 * Hook for å hente gyldige vedtak for registrerte barn
 *
 * @param registrerteBarn - Liste over registrerte barn
 * @param enabled - Om query skal kjøre (default: true)
 * @returns TanStack Query result med gyldige vedtak
 */
export const useGyldigeVedtakForRegistrerteBarn = (registrerteBarn: BarnOppslag[], enabled = true) => {
    return useQuery<GyldigeVedtak, Error>({
        queryKey: ['gyldigeVedtak', registrerteBarn.map((barn) => barn.aktørId)],
        queryFn: () => hentGyldigeVedtakForRegistrerteBarn(registrerteBarn),
        enabled: enabled && registrerteBarn.length > 0,
        staleTime: 5 * 60 * 1000, // 5 minutter - vedtak endrer seg ikke så ofte
        gcTime: 10 * 60 * 1000, // 10 minutter i garbage collection
        retry: 2, // Prøv 2 ganger ekstra ved feil
        refetchOnWindowFocus: false, // Ikke refetch ved fokus
    });
};
