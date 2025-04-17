import { createContext, ReactNode, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Deltakelse, Deltaker } from '@navikt/ung-common';
import { useDeltakelserForDeltaker } from '../hooks/useDeltakelserForDeltaker';
import { useRegistrertDeltaker } from '../hooks/useRegistrertDeltaker';

interface DeltakerContextProps {
    deltaker?: Deltaker;
    deltakelser?: Deltakelse[];
    deltakelserPending?: boolean;
    closeDeltaker: () => void;
    refetchDeltakelser: () => void;
}

const DeltakerContext = createContext<DeltakerContextProps | undefined>(undefined);

interface DeltakerProviderProps {
    children: ReactNode;
    deltakerId: string;
}
export const DeltakerProvider = ({ children, deltakerId }: DeltakerProviderProps) => {
    const navigate = useNavigate();

    const { data: deltaker, isLoading: deltakerPending } = useRegistrertDeltaker(deltakerId || '');

    const {
        data: deltakelser,
        isLoading: deltakelserPending,
        refetch: refetchDeltakelser,
    } = useDeltakelserForDeltaker(deltakerId || '');

    const closeDeltaker = () => {
        navigate('/');
    };

    return (
        <DeltakerContext.Provider
            value={{
                deltaker,
                deltakelser,
                deltakelserPending: deltakerPending || deltakelserPending,
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
