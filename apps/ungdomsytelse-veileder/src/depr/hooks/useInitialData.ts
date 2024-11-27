import { useState } from 'react';
import { useEffectOnce } from '@navikt/sif-common-hooks';

type InitialData = {
    todo: string;
};

export const useInitialData = () => {
    const [initialData, setInitialData] = useState<InitialData>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchInitialData = async () => {
        setInitialData({ todo: 'not yet' });
        setIsLoading(false);
    };

    useEffectOnce(() => {
        fetchInitialData();
    });

    return { initialData, isLoading };
};
