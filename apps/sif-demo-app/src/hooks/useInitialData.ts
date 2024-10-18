import { useState } from 'react';
import {
    Arbeidsgivere,
    fetchArbeidsgivere,
    fetchBarn,
    fetchSøker,
    RegistrertBarn,
    Søker,
} from '@navikt/sif-common-api';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import { ISODateRangeToDateRange } from '@navikt/sif-common-utils';

type InitialData = {
    barn: RegistrertBarn[];
    søker: Søker;
    arbeidsgivere: Arbeidsgivere;
};

export const useInitialData = () => {
    const [initialData, setInitialData] = useState<InitialData>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchInitialData = async () => {
        const søker = await fetchSøker();
        const barn = await fetchBarn();
        const arbeidsgivere = await fetchArbeidsgivere(ISODateRangeToDateRange('2020-01-01/2020-01-31'));
        setInitialData({ søker, barn, arbeidsgivere });
        setIsLoading(false);
    };

    useEffectOnce(() => {
        fetchInitialData();
    });

    return { initialData, isLoading };
};
