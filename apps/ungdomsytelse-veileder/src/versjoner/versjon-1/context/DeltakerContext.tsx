import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { veilederService } from '../../../api/services/veilederService';
import { DeltakerOgDeltakelser } from '../../../api/types';

interface DeltakerContextProps {
    deltaker?: DeltakerOgDeltakelser;
    setDeltaker: (deltaker: DeltakerOgDeltakelser) => void;
    closeDeltaker: () => void;
}

const DeltakerContext = createContext<DeltakerContextProps | undefined>(undefined);

interface DeltakerProviderProps {
    children: ReactNode;
    deltakerId?: string;
}
export const DeltakerProvider = ({ children, deltakerId }: DeltakerProviderProps) => {
    const [deltaker, setDeltaker] = useState<DeltakerOgDeltakelser>();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDeltaker = async (deltakerId: string) => {
            const deltaker = await veilederService.getDeltakerOgDeltakelser({ deltakerId });
            setDeltaker(deltaker);
        };
        if (deltakerId && deltakerId !== deltaker?.deltaker.deltakerId) {
            fetchDeltaker(deltakerId);
        }
    }, [deltakerId]);

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
