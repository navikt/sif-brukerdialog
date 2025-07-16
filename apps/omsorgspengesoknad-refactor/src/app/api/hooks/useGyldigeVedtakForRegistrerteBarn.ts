import { useQuery } from '@tanstack/react-query';
import { RegistrertBarn } from '@navikt/sif-common-query';
import { GyldigeVedtak } from '../../types/GyldigeVedtak';
import { hentGyldigeVedtakForRegistrerteBarn } from '../hent-siste-gyldige-vedtak/hentSisteGyldigeVedtak';

/**
 * Hook for å hente gyldige vedtak for registrerte barn
 *
 * @param registrerteBarn - Liste over registrerte barn
 * @param enabled - Om query skal kjøre (default: true)
 * @returns TanStack Query result med gyldige vedtak
 */
export const useGyldigeVedtakForRegistrerteBarn = (registrerteBarn: RegistrertBarn[], enabled = true) => {
    return useQuery<GyldigeVedtak, Error>({
        queryKey: ['gyldigeVedtak', registrerteBarn.map((barn) => barn.aktørId)],
        queryFn: () => hentGyldigeVedtakForRegistrerteBarn(registrerteBarn),
        enabled: enabled && registrerteBarn.length > 0,
        staleTime: Infinity,
        retry: 1,
    });
};
