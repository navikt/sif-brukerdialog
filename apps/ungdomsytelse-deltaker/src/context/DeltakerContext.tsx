import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Deltaker, fetchDeltaker } from '../api/fetchers/fetchDeltaker';
import { IkkeTilgangÅrsak } from '../types';

interface DeltakerContextType {
    deltaker: Deltaker | null;
    loading: boolean;
    ikkeTilgangÅrsak?: IkkeTilgangÅrsak;
    error: string | null;
}

const DeltakerContext = createContext<DeltakerContextType | undefined>(undefined);

export const DeltakerProvider = ({ children }: { children: ReactNode }) => {
    const [deltaker, setDeltaker] = useState<Deltaker | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const hentDeltaker = async () => {
        try {
            const data = await fetchDeltaker();
            setDeltaker(data);
        } catch (err) {
            setError('Kunne ikke laste data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        hentDeltaker();
    }, []);

    return <DeltakerContext.Provider value={{ deltaker, loading, error }}>{children}</DeltakerContext.Provider>;
};

export const useDeltaker = () => {
    const context = useContext(DeltakerContext);
    if (!context) {
        throw new Error('useDeltaker må brukes innenfor en DeltakerProvider');
    }
    return context;
};
