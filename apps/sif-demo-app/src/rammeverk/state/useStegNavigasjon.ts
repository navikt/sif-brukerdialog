import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { getAktiveSteg, StegConfig, StegStatusCallbacks } from '../types';

import { useSøknadFlyt } from './useSøknadState';

interface UseStegNavigasjonOptions {
    stegConfig: StegConfig;
    stegRekkefølge: string[];
    stegStatus: StegStatusCallbacks;
    basePath?: string;
}

/**
 * Beregner neste/forrige steg basert på fresh state.
 * Viktig for navigasjon etter state-oppdatering i samme event handler.
 */
const getNesteForrigeSteg = (
    stegRekkefølge: string[],
    stegStatus: StegStatusCallbacks,
    currentStegId: string | null,
) => {
    const aktiveSteg = getAktiveSteg(stegRekkefølge, stegStatus);
    const aktiveStegIds = aktiveSteg.map((s) => s.stegId);
    const currentIndex = currentStegId ? aktiveStegIds.indexOf(currentStegId) : -1;

    return {
        forrigeStegId: currentIndex > 0 ? aktiveStegIds[currentIndex - 1] : null,
        nesteStegId: currentIndex < aktiveStegIds.length - 1 ? aktiveStegIds[currentIndex + 1] : null,
    };
};

export const useStegNavigasjon = ({
    stegConfig,
    stegRekkefølge,
    stegStatus,
    basePath = '/soknad',
}: UseStegNavigasjonOptions) => {
    const navigate = useNavigate();
    const setCurrentSteg = useSøknadFlyt((s) => s.setCurrentSteg);

    const gåTilSteg = useCallback(
        (stegId: string) => {
            setCurrentSteg(stegId);
            const route = stegConfig[stegId].route;
            navigate(`${basePath}/${route}`);
        },
        [setCurrentSteg, navigate, basePath, stegConfig],
    );

    const gåTilNeste = useCallback(
        (fraStegId: string) => {
            const { nesteStegId } = getNesteForrigeSteg(stegRekkefølge, stegStatus, fraStegId);
            if (nesteStegId) {
                gåTilSteg(nesteStegId);
            }
        },
        [stegRekkefølge, stegStatus, gåTilSteg],
    );

    const gåTilForrige = useCallback(
        (fraStegId: string) => {
            const { forrigeStegId } = getNesteForrigeSteg(stegRekkefølge, stegStatus, fraStegId);
            if (forrigeStegId) {
                gåTilSteg(forrigeStegId);
            }
        },
        [stegRekkefølge, stegStatus, gåTilSteg],
    );

    const kanGåTilNeste = useCallback(
        (fraStegId: string) => {
            const { nesteStegId } = getNesteForrigeSteg(stegRekkefølge, stegStatus, fraStegId);
            return nesteStegId !== null;
        },
        [stegRekkefølge, stegStatus],
    );

    const kanGåTilForrige = useCallback(
        (fraStegId: string) => {
            const { forrigeStegId } = getNesteForrigeSteg(stegRekkefølge, stegStatus, fraStegId);
            return forrigeStegId !== null;
        },
        [stegRekkefølge, stegStatus],
    );

    return {
        gåTilSteg,
        gåTilNeste,
        gåTilForrige,
        kanGåTilNeste,
        kanGåTilForrige,
    };
};
