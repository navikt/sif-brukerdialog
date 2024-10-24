import { createContext, ReactNode, useContext, useState } from 'react';
import { Deltakelse } from '../../api/types';
import { Søker } from '@navikt/sif-common-api';

interface SøknadContextType {
    data: SøknadContextData;
    updateDeltakelse: (deltakelser: Deltakelse[]) => void;
}

interface SøknadContextData {
    søker: Søker;
    alleDeltakelser: Deltakelse[];
    deltakelserSøktFor: Deltakelse[];
    deltakelserIkkeSøktFor: Deltakelse[];
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
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
        });
    };

    return <SøknadContext.Provider value={{ data, updateDeltakelse }}>{children}</SøknadContext.Provider>;
};
