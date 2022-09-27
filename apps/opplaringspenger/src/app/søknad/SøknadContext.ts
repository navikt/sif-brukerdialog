import { createContext, useContext } from 'react';
import { SøknadContextState } from '../types/SøknadContextState';

export const SøknadContext = createContext<SøknadContextState | undefined>(undefined);

export const SøknadsdataContextProvider = SøknadContext.Provider;

export const SøknadsdataContextConsumer = SøknadContext.Consumer;

export const useSøknadContext = () => {
    const context = useContext(SøknadContext);
    if (context === undefined) {
        throw new Error('useSoknadContext needs to be called within a SøknadsdataContextProvider');
    }
    return context;
};
