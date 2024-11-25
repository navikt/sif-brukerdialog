import { createContext, useState, useContext, ReactNode } from 'react';
import { Deltaker } from '../types/Deltaker';

interface DeltakerContextProps {
    deltaker?: Deltaker;
    setDeltaker: (deltaker?: Deltaker) => void;
}

const DeltakerContext = createContext<DeltakerContextProps | undefined>(undefined);

export const DeltakerProvider = ({
    children,
    initialDeltaker,
}: {
    children: ReactNode;
    initialDeltaker?: Deltaker;
}) => {
    const [deltaker, setDeltaker] = useState<any>(initialDeltaker);
    return <DeltakerContext.Provider value={{ deltaker, setDeltaker }}>{children}</DeltakerContext.Provider>;
};

export const useDeltaker = () => {
    const context = useContext(DeltakerContext);
    if (context === undefined) {
        throw new Error('useDeltaker must be used within a DeltakerProvider');
    }
    return context;
};
