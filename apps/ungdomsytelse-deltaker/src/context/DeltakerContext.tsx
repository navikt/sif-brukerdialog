import { Søker } from '@navikt/sif-common-api';
import { Deltakelse } from '../api/types';
import { createContext, useContext } from 'react';

interface DeltakerContextType {
    søker: Søker;
    deltakelse: Deltakelse;
}

export const DeltakerContext = createContext<DeltakerContextType>(null!);

interface Props {
    children: React.ReactNode;
    søker: Søker;
    deltakelse: Deltakelse;
}

export const DeltakerContextProvider = ({ children, søker, deltakelse }: Props) => {
    return <DeltakerContext.Provider value={{ søker, deltakelse }}>{children}</DeltakerContext.Provider>;
};

export const useDeltakerContext = (): DeltakerContextType => {
    const context = useContext(DeltakerContext);
    if (!context) {
        throw new Error('useDeltakerContext must be used within a DeltakerContextProvider');
    }
    return context;
};
