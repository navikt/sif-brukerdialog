import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { StegConfig } from '../types';

import { useStegFlyt } from './useStegFlyt';
import { useSøknadState } from './useSøknadState';

interface UseStegNavigasjonOptions<TSøknadsdata> {
    stegConfig: StegConfig<TSøknadsdata>;
    stegRekkefølge: string[];
    basePath?: string;
}

export const useStegNavigasjon = <TSøknadsdata>({
    stegConfig,
    stegRekkefølge,
    basePath = '/soknad',
}: UseStegNavigasjonOptions<TSøknadsdata>) => {
    const navigate = useNavigate();
    const setCurrentSteg = useSøknadState((s) => s.setCurrentSteg);
    const { forrigeStegId, nesteStegId } = useStegFlyt({ stegConfig, stegRekkefølge });

    const gåTilSteg = useCallback(
        (stegId: string) => {
            setCurrentSteg(stegId);
            const route = stegConfig[stegId].route;
            navigate(`${basePath}/${route}`);
        },
        [setCurrentSteg, navigate, basePath],
    );

    const gåTilNeste = useCallback(() => {
        if (nesteStegId) {
            gåTilSteg(nesteStegId);
        }
    }, [nesteStegId, gåTilSteg]);

    const gåTilForrige = useCallback(() => {
        if (forrigeStegId) {
            gåTilSteg(forrigeStegId);
        }
    }, [forrigeStegId, gåTilSteg]);

    return {
        gåTilSteg,
        gåTilNeste,
        gåTilForrige,
        kanGåTilNeste: nesteStegId !== null,
        kanGåTilForrige: forrigeStegId !== null,
    };
};
