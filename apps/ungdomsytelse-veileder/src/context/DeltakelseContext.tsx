import { createContext, ReactNode, useContext } from 'react';
import { Deltakelse, Deltaker } from '@navikt/ung-common';

interface DeltakelseContextProps {
    deltaker: Deltaker;
    deltakelse: Deltakelse;
}

const DeltakelseContext = createContext<DeltakelseContextProps | undefined>(undefined);

interface DeltakelseProviderProps {
    children: ReactNode;
    deltaker: Deltaker;
    deltakelse: Deltakelse;
}

export const DeltakelseProvider = ({ children, deltaker, deltakelse }: DeltakelseProviderProps) => {
    return (
        <DeltakelseContext.Provider
            value={{
                deltaker,
                deltakelse,
            }}>
            {children}
        </DeltakelseContext.Provider>
    );
};

export const useDeltakelse = () => {
    const context = useContext(DeltakelseContext);
    if (context === undefined) {
        throw new Error('useDeltaker must be used within a DeltakelseProvider');
    }
    return context;
};
