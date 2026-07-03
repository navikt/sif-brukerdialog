import { createContext, useContext } from 'react';

/**
 * Intern kontekst som deler steg-spesifikk informasjon ned til underkomponenter.
 *
 * Settes opp av SøknadStep og konsumeres av SøknadStepForm.
 * App-utvikler trenger ikke forholde seg til denne.
 */
interface SøknadStepContextValue {
    /**
     * Første inkonsistente steg-ID, eller undefined hvis alt er ok.
     * Beregnet én gang i SøknadStep via useCheckConsistency og delt ned
     * slik at SøknadStepForm ikke trenger å kjøre samme sjekk på nytt.
     */
    inconsistentStepId: string | undefined;
}

export const SøknadStepContext = createContext<SøknadStepContextValue | null>(null);

export const useSøknadStepContext = (): SøknadStepContextValue => {
    const context = useContext(SøknadStepContext);
    if (!context) {
        throw new Error('useSøknadStepContext må brukes innenfor SøknadStep');
    }
    return context;
};
