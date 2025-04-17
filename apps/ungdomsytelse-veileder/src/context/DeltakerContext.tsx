import { createContext, ReactNode, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Deltakelse, Deltaker } from '@navikt/ung-common';

interface DeltakerContextProps {
    deltaker: Deltaker;
    deltakelser: Deltakelse[];
    closeDeltaker: () => void;
    // refetchDeltakelser: () => void;
}

const DeltakerContext = createContext<DeltakerContextProps | undefined>(undefined);

interface DeltakerProviderProps {
    children: ReactNode;
    deltaker: Deltaker;
    deltakelser: Deltakelse[];
}
export const DeltakerProvider = ({ children, deltaker, deltakelser }: DeltakerProviderProps) => {
    const navigate = useNavigate();

    const closeDeltaker = () => {
        navigate('/');
    };

    return (
        <DeltakerContext.Provider
            value={{
                deltaker,
                deltakelser,
                closeDeltaker,
            }}>
            {children}
        </DeltakerContext.Provider>
    );
};

export const useDeltakerContext = () => {
    const context = useContext(DeltakerContext);
    if (context === undefined) {
        throw new Error('useDeltaker must be used within a DeltakerProvider');
    }
    return context;
};
