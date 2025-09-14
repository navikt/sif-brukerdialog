import { Søker } from '@navikt/sif-common-api';
import { createContext, useMemo } from 'react';

import { DeltakelsePeriode } from '../types/DeltakelsePeriode';

export interface DeltakerContextType {
    søker: Søker;
    deltakelsePeriode: DeltakelsePeriode;
    refetchDeltakelser: () => Promise<any>;
}

export const DeltakerContext = createContext<DeltakerContextType>(null!);

interface DeltakerContextProviderProps extends DeltakerContextType {
    children: React.ReactNode;
}

export const DeltakerContextProvider = ({
    children,
    søker,
    deltakelsePeriode,
    refetchDeltakelser,
}: DeltakerContextProviderProps) => {
    const value = useMemo(
        () => ({ søker, deltakelsePeriode, refetchDeltakelser }),
        [søker, deltakelsePeriode, refetchDeltakelser],
    );

    return <DeltakerContext.Provider value={value}>{children}</DeltakerContext.Provider>;
};
