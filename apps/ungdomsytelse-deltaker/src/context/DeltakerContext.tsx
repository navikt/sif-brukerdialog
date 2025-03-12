import { createContext, useContext } from 'react';
import { RegistrertBarn, Søker } from '@navikt/sif-common-api';
import { DeltakelsePeriode } from '@navikt/ung-common';

interface DeltakerContextType {
    søker: Søker;
    deltakelse: DeltakelsePeriode;
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
