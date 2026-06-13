import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSøknadAppContext } from '../context/SøknadAppContext';

/**
 * Hook for å avbryte søknaden.
 * Sletter mellomlagring, nullstiller storen og sender bruker til forsiden.
 */
export function useAvbryt(): { avbryt: () => Promise<void> } {
    const { store, slettMellomlagring } = useSøknadAppContext();
    const navigate = useNavigate();

    const avbryt = useCallback(async (): Promise<void> => {
        await slettMellomlagring();
        store.getState().reset();
        navigate('/');
    }, [store, slettMellomlagring, navigate]);

    return { avbryt };
}
