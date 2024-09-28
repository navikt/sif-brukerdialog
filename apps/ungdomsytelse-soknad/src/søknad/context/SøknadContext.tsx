import { createContext, FunctionComponent, ReactNode } from 'react';
import { InitialData } from '../../hooks/useInitialData';

interface SøknadContextData extends InitialData {
    version?: string;
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const SøknadContext = createContext<SøknadContextData>(null!);

interface Props {
    initialData: SøknadContextData;
    children: ReactNode;
}

export const SøknadContextProvider: FunctionComponent<Props> = ({ children, initialData }) => {
    return <SøknadContext.Provider value={initialData}>{children}</SøknadContext.Provider>;
};
