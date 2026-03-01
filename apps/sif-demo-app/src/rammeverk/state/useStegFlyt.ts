import { useMemo } from 'react';

import { AktivtSteg, getAktiveSteg, StegConfig } from '../types';

import { useSøknadState } from './useSøknadState';

interface UseStegFlytOptions<TSøknadsdata> {
    stegConfig: StegConfig<TSøknadsdata>;
    stegRekkefølge: string[];
}

export const useStegFlyt = <TSøknadsdata>({ stegConfig, stegRekkefølge }: UseStegFlytOptions<TSøknadsdata>) => {
    const søknadsdata = useSøknadState((s) => s.søknadsdata) as Partial<TSøknadsdata>;
    const currentStegId = useSøknadState((s) => s.currentStegId);

    const aktiveSteg: AktivtSteg[] = useMemo(
        () => getAktiveSteg(stegRekkefølge, stegConfig, søknadsdata),
        [stegRekkefølge, stegConfig, søknadsdata],
    );

    const aktiveStegIds = aktiveSteg.map((s) => s.stegId);
    const currentIndex = currentStegId ? aktiveStegIds.indexOf(currentStegId) : -1;

    return {
        aktiveSteg,
        aktiveStegIds,
        currentStegId,
        currentIndex,
        forrigeStegId: currentIndex > 0 ? aktiveStegIds[currentIndex - 1] : null,
        nesteStegId: currentIndex < aktiveStegIds.length - 1 ? aktiveStegIds[currentIndex + 1] : null,
        erFørsteSteg: currentIndex === 0,
        erSisteSteg: currentIndex === aktiveStegIds.length - 1,
        antallSteg: aktiveStegIds.length,
        getStegInfo: (id: string) => stegConfig[id],
    };
};
