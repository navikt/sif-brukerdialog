import { createContext, FunctionComponent, ReactNode, useState } from 'react';

import { PleietrengendeMedSak } from '../server/api-models/PleietrengendeMedSakSchema';
import { Innsynsdata } from '../types/InnsynData';
import { Inntektsmeldinger } from '../types/Inntektsmelding';

interface InnsynsdataContextData {
    innsynsdata: Innsynsdata;
    // Inntektsmeldinger cache (eksisterende)
    inntektsmeldingerCache: Record<string, Inntektsmeldinger>;
    setInntektsmeldinger: (saksnummer: string, data: Inntektsmeldinger) => void;
    getInntektsmeldinger: (saksnummer: string) => Inntektsmeldinger | undefined;
    // Saksdetaljer cache (nytt)
    saksdataCache: Record<string, PleietrengendeMedSak>;
    setSaksdata: (saksnummer: string, data: PleietrengendeMedSak) => void;
    getSaksdata: (saksnummer: string) => PleietrengendeMedSak | undefined;
}

export const InnsynsdataContext = createContext<InnsynsdataContextData>(null!);

interface Props {
    innsynsdata: Innsynsdata;
    children: ReactNode;
}

type InntektsmeldingerCache = Record<string, Inntektsmeldinger>;
type SaksdataCache = Record<string, PleietrengendeMedSak>;

export const InnsynsdataContextProvider: FunctionComponent<Props> = ({ children, innsynsdata }) => {
    const [inntektsmeldingerCache, setInntektsmeldingerCache] = useState<InntektsmeldingerCache>({});
    const [saksdataCache, setSaksdataCache] = useState<SaksdataCache>({});

    const setInntektsmeldinger = (saksnummer: string, data: Inntektsmeldinger) => {
        setInntektsmeldingerCache((prev) => ({ ...prev, [saksnummer]: data }));
    };

    const getInntektsmeldinger = (saksnummer: string) => {
        return inntektsmeldingerCache[saksnummer];
    };

    const setSaksdata = (saksnummer: string, data: PleietrengendeMedSak) => {
        setSaksdataCache((prev) => ({ ...prev, [saksnummer]: data }));
        // Oppdater også inntektsmeldinger cache
        setInntektsmeldinger(saksnummer, data.inntektsmeldinger);
    };

    const getSaksdata = (saksnummer: string) => {
        return saksdataCache[saksnummer];
    };

    return (
        <InnsynsdataContext.Provider
            value={{
                innsynsdata,
                inntektsmeldingerCache,
                setInntektsmeldinger,
                getInntektsmeldinger,
                saksdataCache,
                setSaksdata,
                getSaksdata,
            }}>
            {children}
        </InnsynsdataContext.Provider>
    );
};
