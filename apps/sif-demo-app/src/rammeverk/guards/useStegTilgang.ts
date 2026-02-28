import { useEffect, useMemo } from 'react';

import { StegConfig } from '../types';
import { useSøknadState } from '../state/useSøknadState';

interface UseStegTilgangOptions<TSøknadsdata> {
    stegId: string;
    stegConfig: StegConfig<TSøknadsdata>;
    stegRekkefølge: string[];
}

interface StegTilgangResult {
    erTilgjengelig: boolean;
    sisteGyldigeStegId: string;
}

export const useStegTilgang = <TSøknadsdata>({
    stegId,
    stegConfig,
    stegRekkefølge,
}: UseStegTilgangOptions<TSøknadsdata>): StegTilgangResult => {
    const søknadsdata = useSøknadState((s) => s.søknadsdata) as Partial<TSøknadsdata>;
    const setCurrentSteg = useSøknadState((s) => s.setCurrentSteg);

    const stegDef = stegConfig[stegId];

    const erTilgjengelig = useMemo(() => stegDef?.erTilgjengelig(søknadsdata) ?? false, [stegDef, søknadsdata]);

    const sisteGyldigeStegId = useMemo(() => {
        for (let i = stegRekkefølge.length - 1; i >= 0; i--) {
            const id = stegRekkefølge[i];
            const def = stegConfig[id];
            if (def?.erTilgjengelig(søknadsdata)) {
                const stegIndex = stegRekkefølge.indexOf(stegId);
                const candidateIndex = stegRekkefølge.indexOf(id);
                if (candidateIndex < stegIndex) {
                    return id;
                }
            }
        }
        return stegRekkefølge[0];
    }, [stegRekkefølge, stegConfig, søknadsdata, stegId]);

    useEffect(() => {
        if (erTilgjengelig) {
            setCurrentSteg(stegId);
        }
    }, [erTilgjengelig, stegId, setCurrentSteg]);

    return { erTilgjengelig, sisteGyldigeStegId };
};
