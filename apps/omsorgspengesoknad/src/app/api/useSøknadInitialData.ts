import { useQuery } from '@tanstack/react-query';
import { isUnauthorized } from '@navikt/sif-common-core-ds/src/utils/apiUtils';
import { useBarn, useSøker } from '@navikt/sif-common-query';
import { MELLOMLAGRING_VERSJON } from '../constants/MELLOMLAGRING_VERSJON';
import { SøknadContextState } from '../types/SøknadContextState';
import { SøknadRoutes } from '../types/SøknadRoutes';
import { søknadMellomlagring } from '../utils/søknadMellomlagring';

export type SøknadInitialData = SøknadContextState;

export const defaultSøknadState: Partial<SøknadContextState> = {
    søknadRoute: SøknadRoutes.VELKOMMEN,
};

function useSøknadInitialDataQuery() {
    const søkerQuery = useSøker();
    const barnQuery = useBarn();

    return useQuery({
        queryKey: ['søknadInitialData', søkerQuery.data?.aktørId, barnQuery.data?.length],
        queryFn: async (): Promise<SøknadInitialData> => {
            if (!søkerQuery.data || !barnQuery.data) {
                throw new Error('Søker eller barn data mangler');
            }

            const mellomlagring = await søknadMellomlagring.hent({
                søker: søkerQuery.data,
                registrerteBarn: barnQuery.data,
                MELLOMLAGRING_VERSJON,
            });

            return {
                versjon: MELLOMLAGRING_VERSJON,
                søker: søkerQuery.data,
                registrerteBarn: barnQuery.data,
                søknadsdata: {},
                ...(mellomlagring || defaultSøknadState),
            };
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
        gcTime: Infinity, // Hold i cache til appen lukkes
        refetchOnWindowFocus: false, // Ikke refetch ved fokus
        refetchOnMount: false, // Ikke refetch ved remount
        refetchOnReconnect: false, // Ikke refetch ved reconnect
    });
}

export default useSøknadInitialDataQuery;
