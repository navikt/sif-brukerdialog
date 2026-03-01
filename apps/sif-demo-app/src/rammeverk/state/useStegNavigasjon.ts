import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { StegConfig, StegStatusCallbacks } from '../types';

import { useStegFlyt } from './useStegFlyt';
import { useSøknadFlyt } from './useSøknadState';

interface UseStegNavigasjonOptions {
    stegConfig: StegConfig;
    stegRekkefølge: string[];
    stegStatus: StegStatusCallbacks;
    basePath?: string;
}

export const useStegNavigasjon = ({
    stegConfig,
    stegRekkefølge,
    stegStatus,
    basePath = '/soknad',
}: UseStegNavigasjonOptions) => {
    const navigate = useNavigate();
    const setCurrentSteg = useSøknadFlyt((s) => s.setCurrentSteg);
    const { forrigeStegId, nesteStegId } = useStegFlyt({ stegConfig, stegRekkefølge, stegStatus });

    const gåTilSteg = useCallback(
        (stegId: string) => {
            setCurrentSteg(stegId);
            const route = stegConfig[stegId].route;
            navigate(`${basePath}/${route}`);
        },
        [setCurrentSteg, navigate, basePath, stegConfig],
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
