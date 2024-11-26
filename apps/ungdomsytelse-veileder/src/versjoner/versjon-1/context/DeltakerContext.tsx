import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { veilederService } from '../../../api/services/veilederService';
import { Deltakelser, Deltaker } from '../../../api/types';
import { getZodErrorsInfo } from '../utils/zodUtils';

interface DeltakerContextProps {
    deltaker?: Deltaker;
    deltakelser?: Deltakelser;
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
    const [deltakelser, setDeltakelser] = useState<Deltakelser>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDeltaker = async (deltakerId: string) => {
            try {
                const deltaker = await veilederService.getDeltaker(deltakerId);
                setDeltaker(deltaker);
            } catch (e) {
                getZodErrorsInfo(e);
            }
        };
        const fetchDeltakelser = async (deltakerId: string) => {
            const deltakelser = await veilederService.getDeltakelser(deltakerId);
            setDeltakelser(deltakelser);
        };

        if (deltakerId && deltakerId !== deltaker?.id) {
            fetchDeltaker(deltakerId);
            fetchDeltakelser(deltakerId);
        }
    }, [deltakerId]);

    const closeDeltaker = () => {
        setDeltaker(undefined);
        navigate('/');
    };
    return (
        <DeltakerContext.Provider value={{ deltaker, deltakelser, setDeltaker, closeDeltaker }}>
            {children}
        </DeltakerContext.Provider>
    );
};

export const useDeltaker = () => {
    const context = useContext(DeltakerContext);
    if (context === undefined) {
        throw new Error('useDeltaker must be used within a DeltakerProvider');
    }
    return context;
};
