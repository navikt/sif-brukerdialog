import { useMemo } from 'react';

import { AktivtSteg, getAktiveSteg, StegConfig, StegStatusCallbacks } from '../types';

import { useSøknadFlyt } from './useSøknadState';

interface UseStegFlytOptions {
    stegConfig: StegConfig;
    stegRekkefølge: string[];
    stegStatus: StegStatusCallbacks;
}

export const useStegFlyt = ({ stegConfig, stegRekkefølge, stegStatus }: UseStegFlytOptions) => {
    const currentStegId = useSøknadFlyt((s) => s.currentStegId);

    const aktiveSteg: AktivtSteg[] = useMemo(
        () => getAktiveSteg(stegRekkefølge, stegStatus),
        [stegRekkefølge, stegStatus],
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
