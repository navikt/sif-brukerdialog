import { Oppgave, Søker } from '@sif/api';
import { createContext, useMemo } from 'react';

export interface InnsynContextType {
    søker: Søker;
    oppgaver: Oppgave[];
    refetchOppgaver: () => Promise<any>;
}

export const InnsynContext = createContext<InnsynContextType>(null!);

interface ContextProviderProps extends InnsynContextType {
    children: React.ReactNode;
}

export const InnsynContextProvider = ({ children, søker, oppgaver, refetchOppgaver }: ContextProviderProps) => {
    const value = useMemo(() => ({ søker, oppgaver, refetchOppgaver }), [søker, oppgaver, refetchOppgaver]);

    return <InnsynContext.Provider value={value}>{children}</InnsynContext.Provider>;
};
