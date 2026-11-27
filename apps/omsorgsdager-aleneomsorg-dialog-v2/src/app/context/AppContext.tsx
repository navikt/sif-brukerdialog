import { RegistrertBarn, Søker } from '@sif/api/k9-brukerdialog-prosessering';
import { createContext, useContext } from 'react';

interface AppContextData {
    søker: Søker;
    registrerteBarn: RegistrertBarn[];
}

const AppContext = createContext<AppContextData | null>(null);

export const AppContextProvider = AppContext.Provider;

export const useAppContext = (): AppContextData => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext brukt utenfor AppContextProvider');
    }
    return context;
};
