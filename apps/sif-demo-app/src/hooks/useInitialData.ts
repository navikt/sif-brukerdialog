import { useState } from 'react';
import { fetchBarn, fetchSøker, RegistrertBarn, Søker } from '@navikt/sif-common';
import { useEffectOnce } from '@navikt/sif-common-hooks';

type InitialData = {
    barn: RegistrertBarn[];
    søker: Søker;
};

export const useInitialData = () => {
    const [initialData, setInitialData] = useState<InitialData>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchInitialData = async () => {
        const s = await fetchSøker();
        const barn = await fetchBarn();
        setInitialData({ søker: s, barn: barn });
        setIsLoading(false);
    };
    useEffectOnce(() => {
        fetchInitialData();
    });

    return { initialData, isLoading };
};
