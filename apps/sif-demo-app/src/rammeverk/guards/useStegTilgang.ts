import { useEffect, useMemo } from 'react';

import { getAktiveSteg, StegConfig } from '../types';
import { useSøknadState } from '../state/useSøknadState';

interface UseStegTilgangOptions<TSøknadsdata> {
    stegId: string;
    stegConfig: StegConfig<TSøknadsdata>;
    stegRekkefølge: string[];
}

interface StegTilgangResult {
    erTilgjengelig: boolean;
    erFullført: boolean;
    sisteGyldigeStegId: string;
}

export const useStegTilgang = <TSøknadsdata>({
    stegId,
    stegConfig,
    stegRekkefølge,
}: UseStegTilgangOptions<TSøknadsdata>): StegTilgangResult => {
    const søknadsdata = useSøknadState((s) => s.søknadsdata) as Partial<TSøknadsdata>;
    const setCurrentSteg = useSøknadState((s) => s.setCurrentSteg);

    const aktiveSteg = useMemo(
        () => getAktiveSteg(stegRekkefølge, stegConfig, søknadsdata),
        [stegRekkefølge, stegConfig, søknadsdata],
    );

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
