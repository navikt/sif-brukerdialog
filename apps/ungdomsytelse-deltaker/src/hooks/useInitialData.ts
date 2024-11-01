import { useState } from 'react';
import { fetchSøker } from '@navikt/sif-common-api';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import { deltakerService } from '../api/services/deltakerService';
import { SøknadContextData } from '../søknad/context/SøknadContext';
import { deltakelseErÅpenForRapportering } from '../utils/deltakelserUtils';

export type InitialData = SøknadContextData;

export const useInitialData = () => {
    const [initialData, setInitialData] = useState<InitialData>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>();

    const fetchInitialData = async () => {
        setError(undefined);
        try {
            const søker = await fetchSøker();
            const alleDeltakelser = await deltakerService.getDeltakelser();
            const deltakelserSøktFor = alleDeltakelser.filter((d) => d.harSøkt);
            const deltakelserIkkeSøktFor = alleDeltakelser.filter((d) => !d.harSøkt);
            const deltakelserÅpenForRapportering = deltakelserSøktFor.filter(deltakelseErÅpenForRapportering);

            setInitialData({
                søker,
                alleDeltakelser,
                deltakelserSøktFor,
                deltakelserIkkeSøktFor,
                deltakelserÅpenForRapportering,
            });
            setIsLoading(false);
        } catch (e) {
            setError(e);
            setIsLoading(false);
        }
    };

    useEffectOnce(() => {
        fetchInitialData();
    });

    return { initialData, error, isLoading };
};
