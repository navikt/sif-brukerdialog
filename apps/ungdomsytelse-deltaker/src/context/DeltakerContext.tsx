import { createContext } from 'react';
import { Søker } from '@navikt/sif-common-api';
import { DeltakelsePeriode } from '@navikt/ung-common';

export interface DeltakerContextType {
    søker: Søker;
    deltakelse: DeltakelsePeriode;
    refetchDeltakelser: () => Promise<any>;
}

export const DeltakerContext = createContext<DeltakerContextType>(null!);

interface DeltakerContextProviderProps extends DeltakerContextType {
    children: React.ReactNode;
}

export const DeltakerContextProvider = ({
    children,
    søker,
    deltakelse,
    refetchDeltakelser,
}: DeltakerContextProviderProps) => {
    return (
        <DeltakerContext.Provider value={{ søker, deltakelse, refetchDeltakelser }}>
            {children}
        </DeltakerContext.Provider>
    );
};
