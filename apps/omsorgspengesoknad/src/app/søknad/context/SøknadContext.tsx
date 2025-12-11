import { createContext, Dispatch, FunctionComponent, ReactNode, useMemo, useReducer } from 'react';
import { SøknadContextState } from '../../types/SøknadContextState';
import { SøknadContextAction } from './action/actionCreator';
import { søknadReducer } from './reducer/søknadReducer';

interface SøknadContextData {
    state: SøknadContextState;
    dispatch: Dispatch<SøknadContextAction>;
}

export const SøknadContext = createContext<SøknadContextData>(null!);

interface Props {
    initialState: SøknadContextState;
    children: ReactNode;
}

export const SøknadContextProvider: FunctionComponent<Props> = ({ children, initialState }) => {
    const [state, dispatch] = useReducer(søknadReducer, initialState);

    const contextValue = useMemo(() => {
        return { state, dispatch };
    }, [state, dispatch]);

    return <SøknadContext.Provider value={contextValue}>{children}</SøknadContext.Provider>;
};
