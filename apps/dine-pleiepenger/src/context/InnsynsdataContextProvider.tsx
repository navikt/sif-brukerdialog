import { createContext, FunctionComponent, ReactNode, useState } from 'react';

import { PleietrengendeMedSak } from '../server/api-models/PleietrengendeMedSakSchema';
import { Innsynsdata } from '../types/InnsynData';

interface InnsynsdataContextData {
    innsynsdata: Innsynsdata;
    saksdataCache: Record<string, PleietrengendeMedSak>;
    setSaksdata: (saksnummer: string, data: PleietrengendeMedSak) => void;
    getSaksdata: (saksnummer: string) => PleietrengendeMedSak | undefined;
}

export const InnsynsdataContext = createContext<InnsynsdataContextData>(null!);

interface Props {
    innsynsdata: Innsynsdata;
    children: ReactNode;
}

type SaksdataCache = Record<string, PleietrengendeMedSak>;

export const InnsynsdataContextProvider: FunctionComponent<Props> = ({ children, innsynsdata }) => {
    const [saksdataCache, setSaksdataCache] = useState<SaksdataCache>({});

    const setSaksdata = (saksnummer: string, data: PleietrengendeMedSak) => {
        setSaksdataCache((prev) => ({ ...prev, [saksnummer]: data }));
    };

    const getSaksdata = (saksnummer: string) => {
        return saksdataCache[saksnummer];
    };

    return (
        <InnsynsdataContext.Provider
            value={{
                innsynsdata,
                saksdataCache,
                setSaksdata,
                getSaksdata,
            }}>
            {children}
        </InnsynsdataContext.Provider>
    );
};
