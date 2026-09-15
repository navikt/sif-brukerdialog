import { RegistrertBarn, Søker } from '@sif/api/k9-prosessering';
import { UtvidetKontonummerInfo } from '@sif/api/ung-deltaker';
import { createContext, useContext } from 'react';

export interface AppContextData {
    søker: Søker;
    registrerteBarn: RegistrertBarn[];
    kontoInfo: UtvidetKontonummerInfo;
}

const AppContext = createContext<AppContextData | null>(null);

/**
 * AppContextProvider inneholder data som er lastet inn ved oppstart
 * av applikasjonen - "grunndata"
 */
export const AppContextProvider = AppContext.Provider;

export const useAppContext = (): AppContextData => {
    const ctx = useContext(AppContext);
    if (!ctx) {
        throw new Error('useAppContext brukt utenfor AppContextProvider');
    }
    return ctx;
};
