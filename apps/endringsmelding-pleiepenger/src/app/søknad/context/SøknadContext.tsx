import { createContext, Dispatch, FunctionComponent, ReactNode, useMemo, useReducer } from 'react';
import { SøknadInitialData } from '../../hooks/useSøknadInitialData';
import { SøknadContextState } from '../../types/SøknadContextState';
import { SøknadContextAction } from './action/actionCreator';
import { søknadReducer } from './reducer/søknadReducer';

interface SøknadContextData {
    state: SøknadContextState;
    dispatch: Dispatch<SøknadContextAction>;
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const SøknadContext = createContext<SøknadContextData>(null!);

interface Props {
    initialData: SøknadInitialData;
    children: ReactNode;
}

export const SøknadContextProvider: FunctionComponent<Props> = ({ children, initialData }) => {
    const [state, dispatch] = useReducer(søknadReducer, initialData as any);

    const contextValue = useMemo(() => {
        return { state, dispatch };
    }, [state, dispatch]);

    return <SøknadContext.Provider value={contextValue}>{children}</SøknadContext.Provider>;
};
