import { RegistrertBarn, Søker } from '@sif/api/k9-prosessering';
import { createContext, useContext } from 'react';

export interface AppContextData {
    søker: Søker;
    barn: RegistrertBarn[];
}

const AppContext = createContext<AppContextData | null>(null);

export const AppContextProvider = AppContext.Provider;

export const useAppContext = (): AppContextData => {
    const ctx = useContext(AppContext);
    if (!ctx) {
        throw new Error('useAppContext brukt utenfor AppContextProvider');
    }
    return ctx;
};
