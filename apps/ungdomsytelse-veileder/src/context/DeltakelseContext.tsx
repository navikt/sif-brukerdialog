import { createContext, ReactNode, useContext } from 'react';
import { Deltakelse, Deltaker } from '@navikt/ung-common';
import { useDeltaker } from './DeltakerContext';

interface DeltakelseContextProps {
    deltaker: Deltaker;
    deltakelse: Deltakelse;
    onDeltakelseChanged: () => void;
}

const DeltakelseContext = createContext<DeltakelseContextProps | undefined>(undefined);

interface DeltakelseProviderProps {
    children: ReactNode;
    deltaker: Deltaker;
    deltakelse: Deltakelse;
}

export const DeltakelseProvider = ({ children, deltaker, deltakelse }: DeltakelseProviderProps) => {
    const { refetchDeltakelser } = useDeltaker();
    return (
        <DeltakelseContext.Provider
            value={{
                deltaker,
                deltakelse,
                onDeltakelseChanged: refetchDeltakelser,
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
