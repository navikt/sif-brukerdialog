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
    const currentStegId = useSøknadFlyt((s) => s.currentStegId);

    const setBørMellomlagres = useSøknadFlyt((s) => s.setBørMellomlagres);

    const gåTilSteg = useCallback(
        (stegId: string) => {
            setCurrentSteg(stegId);
            console.log('Må mellomlagres');
            setBørMellomlagres(true);
            const route = stegConfig[stegId].route;
            navigate(`${basePath}/${route}`);
        },
        [setCurrentSteg, setBørMellomlagres, navigate, basePath, stegConfig],
    );

    const gåTilNeste = useCallback(() => {
        // Beregn fresh nesteStegId for å få med siste state-endringer
        const { nesteStegId } = getNesteForrigeSteg(stegRekkefølge, stegStatus, currentStegId);
        if (nesteStegId) {
            gåTilSteg(nesteStegId);
        }
    }, [stegRekkefølge, stegStatus, currentStegId, gåTilSteg]);

    const gåTilForrige = useCallback(() => {
        // Beregn fresh forrigeStegId for å få med siste state-endringer
        const { forrigeStegId } = getNesteForrigeSteg(stegRekkefølge, stegStatus, currentStegId);
        if (forrigeStegId) {
            gåTilSteg(forrigeStegId);
        }
    }, [stegRekkefølge, stegStatus, currentStegId, gåTilSteg]);

    // For UI-formål (disable knapper etc) - kan bruke cached verdier
    const { forrigeStegId, nesteStegId } = getNesteForrigeSteg(stegRekkefølge, stegStatus, currentStegId);

    return {
        gåTilSteg,
        gåTilNeste,
        gåTilForrige,
        kanGåTilNeste: nesteStegId !== null,
        kanGåTilForrige: forrigeStegId !== null,
    };
};
