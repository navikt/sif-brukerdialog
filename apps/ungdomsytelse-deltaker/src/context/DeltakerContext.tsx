import { RegistrertBarn, Søker } from '@navikt/sif-common-api';
import { Deltakelse } from '../api/types';
import { createContext, useContext } from 'react';

interface DeltakerContextType {
    søker: Søker;
    deltakelse: Deltakelse;
    barn: RegistrertBarn[];
}

export const DeltakerContext = createContext<DeltakerContextType>(null!);

interface DeltakerContextProviderProps extends DeltakerContextType {
    children: React.ReactNode;
}

export const DeltakerContextProvider = ({ children, søker, barn, deltakelse }: DeltakerContextProviderProps) => {
    return <DeltakerContext.Provider value={{ søker, deltakelse, barn }}>{children}</DeltakerContext.Provider>;
};

export const useDeltakerContext = (): DeltakerContextType => {
    const context = useContext(DeltakerContext);
    if (!context) {
        throw new Error('useDeltakerContext must be used within a DeltakerContextProvider');
    }
    return context;
};
