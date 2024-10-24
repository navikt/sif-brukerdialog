import { useState } from 'react';
import { fetchSøker, Søker } from '@navikt/sif-common-api';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import { Deltakelse } from '../api/types';
import { deltakerService } from '../api/services/deltakerService';

export type InitialData = {
    søker: Søker;
    alleDeltakelser: Deltakelse[];
    deltakelserSøktFor: Deltakelse[];
    deltakelserIkkeSøktFor: Deltakelse[];
};

export const useInitialData = () => {
    const [state, setState] = useState<InitialData>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchInitialData = async () => {
        const søker = await fetchSøker();
        const deltakelser = await deltakerService.getDeltakelser();
        setState({
            søker,
            alleDeltakelser: deltakelser,
            deltakelserSøktFor: deltakelser.filter((d) => d.harSøkt),
            deltakelserIkkeSøktFor: deltakelser.filter((d) => !d.harSøkt),
        });
        setIsLoading(false);
    };

    useEffectOnce(() => {
        fetchInitialData();
    });

    return { initialData: state, isLoading };
};
