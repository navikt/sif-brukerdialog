import { createContext, ReactNode, useContext, useState } from 'react';
import { Søker } from '@navikt/sif-common-api';
import { Deltakelse } from '../../api/types';
import { deltakelseErÅpenForRapportering } from '../../utils/deltakelserUtils';

interface SøknadContextType {
    data: SøknadContextData;
    updateDeltakelse: (deltakelser: Deltakelse[]) => void;
}

export interface SøknadContextData {
    søker: Søker;
    alleDeltakelser: Deltakelse[];
    deltakelserSøktFor: Deltakelse[];
    deltakelserIkkeSøktFor: Deltakelse[];
    deltakelserÅpenForRapportering: Deltakelse[];
}

export const SøknadContext = createContext<SøknadContextType>(null!);

export const useSøknadContext = (): SøknadContextType => {
    const context = useContext(SøknadContext);
    if (!context) {
        throw new Error('useSøknadContext must be used within a SøknadContextProvider');
    }
    return context;
};
interface Props {
    children: ReactNode;
    initialData: SøknadContextData;
}

export const SøknadContextProvider = ({ children, initialData }: Props) => {
    const [data, setData] = useState<SøknadContextData>(initialData);

    const updateDeltakelse = (deltakelser: Deltakelse[]) => {
        setData({
            ...data,
            alleDeltakelser: deltakelser,
            deltakelserSøktFor: deltakelser.filter((d) => d.harSøkt),
            deltakelserIkkeSøktFor: deltakelser.filter((d) => !d.harSøkt),
            deltakelserÅpenForRapportering: deltakelser.filter(deltakelseErÅpenForRapportering),
        });
    };

    return <SøknadContext.Provider value={{ data, updateDeltakelse }}>{children}</SøknadContext.Provider>;
};
