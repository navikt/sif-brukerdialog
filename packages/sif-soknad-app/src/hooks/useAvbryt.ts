import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { ApplikasjonHendelse, useAnalyticsInstance } from '../analytics/analytics';
import { useSøknadAppContext } from '../context/SøknadAppContext';

/**
 * Hook for å avbryte søknaden.
 * Sletter mellomlagring, nullstiller storen og sender bruker til forsiden.
 */
export function useAvbryt(): { avbryt: () => Promise<void> } {
    const { store, slettMellomlagring } = useSøknadAppContext();
    const navigate = useNavigate();
    const { logHendelse } = useAnalyticsInstance();

    const avbryt = useCallback(async (): Promise<void> => {
        await logHendelse(ApplikasjonHendelse.avbryt);
        await slettMellomlagring();
        store.getState().reset();
        navigate('/');
    }, [store, slettMellomlagring, navigate, logHendelse]);

    return { avbryt };
}
