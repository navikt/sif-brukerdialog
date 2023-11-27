import { createContext, FunctionComponent, ReactNode } from 'react';
import { Innsynsdata } from '../types/InnsynData';

interface InnsynsdataContextData {
    innsynsdata: Innsynsdata;
}

export const InnsynsdataContext = createContext<InnsynsdataContextData>(null!);

interface Props {
    innsynsdata: Innsynsdata;
    children: ReactNode;
}

export const InnsynsdataContextProvider: FunctionComponent<Props> = ({ children, innsynsdata }) => {
    return <InnsynsdataContext.Provider value={{ innsynsdata }}>{children}</InnsynsdataContext.Provider>;
};
