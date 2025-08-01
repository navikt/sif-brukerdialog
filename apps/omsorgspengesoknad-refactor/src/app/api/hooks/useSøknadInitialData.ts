import { useQuery } from '@tanstack/react-query';
import { isUnauthorized } from '@navikt/sif-common-core-ds/src/utils/apiUtils';
import { useRegistrerteBarn, useSøker } from '@navikt/sif-common-query';
import { MELLOMLAGRING_VERSJON } from '../../constants/MELLOMLAGRING_VERSJON';
import { SøknadContextState } from '../../types/SøknadContextState';
import { SøknadRoutes } from '../../types/SøknadRoutes';
import { stateMellomlagring } from '../../utils/stateMellomlagring';

export const defaultSøknadState: Partial<SøknadContextState> = {
    søknadRoute: SøknadRoutes.VELKOMMEN,
};

/**
 * Henter grunndata som trengs for underveis i søknaden. Når søker og barn er hentet, lastes
 * mellomlagring og en ser om denne fortsatt er gyldig. I så fall brukes den som initial data.
 * Hvis ikke, brukes defaultSøknadState.
 * @returns initial data for søknaden, inkludert søker, registrerte barn og evt. søknadsdata.
 */

function useSøknadInitialData() {
    const søkerQuery = useSøker();
    const barnQuery = useRegistrerteBarn();

    return useQuery({
        queryKey: ['søknadInitialData', søkerQuery.data?.aktørId, barnQuery.data?.length],
        queryFn: async (): Promise<SøknadContextState> => {
            if (!søkerQuery.data || !barnQuery.data) {
                throw new Error('Søker eller barn data mangler');
            }

            const mellomlagring = await stateMellomlagring.hent({
                søker: søkerQuery.data,
                registrerteBarn: barnQuery.data,
                MELLOMLAGRING_VERSJON,
            });

            const initialData = {
                versjon: MELLOMLAGRING_VERSJON,
                søker: søkerQuery.data,
                registrerteBarn: barnQuery.data,
                søknadsdata: {},
                ...(mellomlagring || defaultSøknadState),
            };

            return initialData;
        },
        enabled: !!søkerQuery.data && !!barnQuery.data && !søkerQuery.isLoading && !barnQuery.isLoading,
        retry: (failureCount, error) => {
            // Ikke retry på unauthorized errors - bare hold loading state
            if (isUnauthorized(error as any)) {
                return false;
            }
            // Standard retry logikk for andre feil
            return failureCount < 3;
        },
        staleTime: Infinity, // Data endres aldri etter oppstart
    });
}

export default useSøknadInitialData;
