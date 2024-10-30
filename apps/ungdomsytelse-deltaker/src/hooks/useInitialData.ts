import { useState } from 'react';
import { fetchSøker } from '@navikt/sif-common-api';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import { deltakerService } from '../api/services/deltakerService';
import { SøknadContextData } from '../søknad/context/SøknadContext';
import { deltakelseErÅpenForRapportering, isDeltakelseSøktFor } from '../utils/deltakelserUtils';

export type InitialData = SøknadContextData;

export const useInitialData = () => {
    const [state, setState] = useState<InitialData>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchInitialData = async () => {
        const søker = await fetchSøker();
        const deltakelser = await deltakerService.getDeltakelser();
        const deltakelserSøktFor = deltakelser.filter(isDeltakelseSøktFor);

        setState({
            søker,
            alleDeltakelser: deltakelser,
            deltakelserSøktFor,
            deltakelserÅpenForRapportering: deltakelserSøktFor.filter(deltakelseErÅpenForRapportering),
            deltakelserIkkeSøktFor: deltakelser.filter((d) => !d.harSøkt),
        });
        setIsLoading(false);
    };

    useEffectOnce(() => {
        fetchInitialData();
    });

    return { initialData: state, isLoading };
};
