import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { veilederService } from '../../../api/services/veilederService';
import { Deltaker } from '../types/Deltaker';
import { useNavigate } from 'react-router-dom';

interface DeltakerContextProps {
    deltaker?: Deltaker;
    setDeltaker: (deltaker: Deltaker) => void;
    closeDeltaker: () => void;
}

const DeltakerContext = createContext<DeltakerContextProps | undefined>(undefined);

interface DeltakerProviderProps {
    children: ReactNode;
    deltakerId?: string;
}
export const DeltakerProvider = ({ children, deltakerId }: DeltakerProviderProps) => {
    const [deltaker, setDeltaker] = useState<Deltaker>();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDeltaker = async (id: string) => {
            const deltaker = await veilederService.getDeltaker(id);
            setDeltaker(deltaker);
        };
        if (deltakerId) {
            fetchDeltaker(deltakerId);
        }
    });

    const closeDeltaker = () => {
        setDeltaker(undefined);
        navigate('/');
    };
    return (
        <DeltakerContext.Provider value={{ deltaker, setDeltaker, closeDeltaker }}>{children}</DeltakerContext.Provider>
    );
};

export const useDeltaker = () => {
    const context = useContext(DeltakerContext);
    if (context === undefined) {
        throw new Error('useDeltaker must be used within a DeltakerProvider');
    }
    return context;
};
