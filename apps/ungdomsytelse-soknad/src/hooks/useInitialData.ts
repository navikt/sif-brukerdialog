import { useState } from 'react';
import { fetchSøker, Søker } from '@navikt/sif-common';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import { Deltakelse } from '../api/types';
import { deltakerService } from '../api/services/deltakerService';

export type InitialData = {
    søker: Søker;
    deltakelserSøktFor: Deltakelse[];
    deltakelserIkkeSøktFor: Deltakelse[];
};

export const useInitialData = () => {
    const [state, setState] = useState<InitialData>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchInitialData = async () => {
        const søker = await fetchSøker();
        const deltakelser = await deltakerService.getDeltakelser(søker.fødselsnummer);
        setState({
            søker,
            deltakelserSøktFor: deltakelser.filter((d) => d.søktFor),
            deltakelserIkkeSøktFor: deltakelser.filter((d) => !d.søktFor),
        });
        setIsLoading(false);
    };

    useEffectOnce(() => {
        fetchInitialData();
    });

    return { initialData: state, isLoading };
};
