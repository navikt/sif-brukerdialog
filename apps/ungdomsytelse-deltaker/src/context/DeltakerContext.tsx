import { Søker } from '@navikt/sif-common-api';
import { createContext, useMemo } from 'react';

import { DeltakelsePeriode } from '../types/DeltakelsePeriode';
import { Oppgave } from '../types/Oppgave';

export interface DeltakerContextType {
    søker: Søker;
    deltakelsePeriode: DeltakelsePeriode;
    oppgaver: Oppgave[];
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
    oppgaver,
    refetchDeltakelser,
}: DeltakerContextProviderProps) => {
    const value = useMemo(
        () => ({ søker, deltakelsePeriode, oppgaver, refetchDeltakelser }),
        [søker, deltakelsePeriode, oppgaver, refetchDeltakelser],
    );

    return <DeltakerContext.Provider value={value}>{children}</DeltakerContext.Provider>;
};
