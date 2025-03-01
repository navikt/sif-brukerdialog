import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getZodErrorsInfo } from '../utils/zodUtils';
import { Deltakelse, Deltaker, getDeltakelser, getDeltakerByDeltakerId } from '@navikt/ung-common';
interface DeltakerContextProps {
    deltaker?: Deltaker;
    deltakelser?: Deltakelse[];
    setDeltaker: (deltaker: Deltaker) => void;
    closeDeltaker: () => void;
    refetchDeltakelser: () => void;
}

const DeltakerContext = createContext<DeltakerContextProps | undefined>(undefined);

interface DeltakerProviderProps {
    children: ReactNode;
    deltakerId?: string;
}
export const DeltakerProvider = ({ children, deltakerId }: DeltakerProviderProps) => {
    const navigate = useNavigate();

    const [deltaker, setDeltaker] = useState<Deltaker>();
    const [deltakelser, setDeltakelser] = useState<Deltakelse[]>([]);

    const fetchDeltakelser = async (deltakerId: string) => {
        const deltakelser = await getDeltakelser(deltakerId);
        setDeltakelser(deltakelser);
    };

    useEffect(() => {
        const fetchDeltaker = async (deltakerId: string) => {
            try {
                const deltaker = await getDeltakerByDeltakerId(deltakerId);
                setDeltaker(deltaker);
            } catch (e) {
                getZodErrorsInfo(e);
            }
        };

        if (deltakerId && deltakerId !== deltaker?.id) {
            fetchDeltaker(deltakerId);
            fetchDeltakelser(deltakerId);
        }
    }, [deltakerId]);

    const refetchDeltakelser = async () => {
        if (deltaker) {
            const oppdaterteDeltakelser = await getDeltakelser(deltaker.id);
            setDeltakelser(oppdaterteDeltakelser);
        }
    };

    const closeDeltaker = () => {
        setDeltaker(undefined);
        navigate('/');
    };
    return (
        <DeltakerContext.Provider
            value={{
                deltaker,
                deltakelser,
                setDeltaker,
                closeDeltaker,
                refetchDeltakelser,
            }}>
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
