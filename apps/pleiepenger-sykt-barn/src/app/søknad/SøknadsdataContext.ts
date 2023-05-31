import { createContext, useContext } from 'react';
import { ImportertSøknadMetadata } from '../types/ImportertSøknad';
import { Søknadsdata } from '../types/søknadsdata/Søknadsdata';

export interface SøknadsdataContextInterface {
    søknadsdata: Søknadsdata;
    importertSøknadMetadata?: ImportertSøknadMetadata | undefined;
    setSøknadsdata: (søknadsdata: Søknadsdata) => void;
    setImportertSøknadMetadata: (søknad: ImportertSøknadMetadata) => void;
}

export const SøknadsdataContext = createContext<SøknadsdataContextInterface>({
    søknadsdata: {},
    setSøknadsdata: () => null,
    setImportertSøknadMetadata: () => null,
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
