import { useEffect, useMemo } from 'react';

import { getAktiveSteg, StegStatusCallbacks } from '../types';
import { useSøknadFlyt } from '../state/useSøknadState';

interface UseStegTilgangOptions {
    stegId: string;
    stegRekkefølge: string[];
    stegStatus: StegStatusCallbacks;
}

interface StegTilgangResult {
    erTilgjengelig: boolean;
    erFullført: boolean;
    sisteGyldigeStegId: string;
}

export const useStegTilgang = ({ stegId, stegRekkefølge, stegStatus }: UseStegTilgangOptions): StegTilgangResult => {
    const setCurrentSteg = useSøknadFlyt((s) => s.setAktivtSteg);

    const aktiveSteg = useMemo(() => getAktiveSteg(stegRekkefølge, stegStatus), [stegRekkefølge, stegStatus]);

    const currentStegInfo = useMemo(() => aktiveSteg.find((s) => s.stegId === stegId), [aktiveSteg, stegId]);

    const erTilgjengelig = currentStegInfo?.erTilgjengelig ?? false;
    const erFullført = currentStegInfo?.erFullført ?? false;

    const sisteGyldigeStegId = useMemo(() => {
        const tilgjengelige = aktiveSteg.filter((s) => s.erTilgjengelig);
        return tilgjengelige.length > 0 ? tilgjengelige[tilgjengelige.length - 1].stegId : stegRekkefølge[0];
    }, [aktiveSteg, stegRekkefølge]);

    useEffect(() => {
        if (erTilgjengelig) {
            setCurrentSteg(stegId);
        }
    }, [erTilgjengelig, stegId, setCurrentSteg]);

    return { erTilgjengelig, erFullført, sisteGyldigeStegId };
};
