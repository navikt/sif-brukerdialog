import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Deltakelse, Deltaker } from '@navikt/ung-common';
import { veilederApiService } from '../api/veilederApiService';
import { getZodErrorsInfo } from '../utils/zodUtils';

interface DeltakerContextProps {
    deltaker?: Deltaker;
    deltakelser?: Deltakelse[];
    deltakelserPending?: boolean;
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
    const [deltakelserPending, setDeltakelserPending] = useState(false);

    const fetchDeltakelser = async (deltakerId: string) => {
        setDeltakelserPending(true);
        const deltakelser = await veilederApiService.getDeltakelser(deltakerId);
        setDeltakelser(deltakelser);
        setDeltakelserPending(false);
    };

    useEffect(() => {
        const fetchDeltaker = async (deltakerId: string) => {
            try {
                const deltaker = await veilederApiService.getDeltakerByDeltakerId(deltakerId);
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
            const oppdaterteDeltakelser = await veilederApiService.getDeltakelser(deltaker.id);
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
                deltakelserPending,
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
