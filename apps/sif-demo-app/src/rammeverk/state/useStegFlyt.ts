import { useMemo } from 'react';

import { StegConfig } from '../types';

import { useSøknadState } from './useSøknadState';

interface UseStegFlytOptions<TSøknadsdata> {
    stegConfig: StegConfig<TSøknadsdata>;
    stegRekkefølge: string[];
}

export const useStegFlyt = <TSøknadsdata>({ stegConfig, stegRekkefølge }: UseStegFlytOptions<TSøknadsdata>) => {
    const søknadsdata = useSøknadState((s) => s.søknadsdata) as Partial<TSøknadsdata>;
    const currentStegId = useSøknadState((s) => s.currentStegId);

    const aktiveSteg = useMemo(
        () => stegRekkefølge.filter((id) => stegConfig[id]?.erTilgjengelig(søknadsdata)),
        [stegRekkefølge, stegConfig, søknadsdata],
    );

    const currentIndex = currentStegId ? aktiveSteg.indexOf(currentStegId) : -1;

    return {
        aktiveSteg,
        currentStegId,
        currentIndex,
        forrigeStegId: currentIndex > 0 ? aktiveSteg[currentIndex - 1] : null,
        nesteStegId: currentIndex < aktiveSteg.length - 1 ? aktiveSteg[currentIndex + 1] : null,
        erFørsteSteg: currentIndex === 0,
        erSisteSteg: currentIndex === aktiveSteg.length - 1,
        antallSteg: aktiveSteg.length,
        getStegInfo: (id: string) => stegConfig[id],
        getStegRoute: (id: string) => stegConfig[id]?.route ?? id,
    };
};
