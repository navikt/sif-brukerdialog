import { createContext, useContext } from 'react';

import { Søknadsdata } from '../types/søknadsdata/Søknadsdata';

export interface SøknadsdataContextInterface {
    søknadsdata: Søknadsdata;
    setSøknadsdata: (søknadsdata: Søknadsdata) => void;
}

export const SøknadsdataContext = createContext<SøknadsdataContextInterface>({
    søknadsdata: { isInitialized: false },
    setSøknadsdata: () => null,
});

export const SøknadsdataContextProvider = SøknadsdataContext.Provider;
export const SøknadsdataContextConsumer = SøknadsdataContext.Consumer;

export const useSøknadsdataContext = () => {
    const context = useContext(SøknadsdataContext);
    if (context === undefined) {
        throw new Error('useSoknadsdataContext needs to be called within a SøknadsdataContextProvider');
    }
    return context;
};
