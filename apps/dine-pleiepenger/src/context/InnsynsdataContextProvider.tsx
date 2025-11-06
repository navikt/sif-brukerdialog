import { createContext, FunctionComponent, ReactNode, useState } from 'react';

import { PleietrengendeMedSak } from '../server/api-models/PleietrengendeMedSakSchema';
import { Innsynsdata } from '../types/InnsynData';
import { Inntektsmeldinger } from '../types/Inntektsmelding';

interface InnsynsdataContextData {
    innsynsdata: Innsynsdata;
    inntektsmeldingerCache: Record<string, Inntektsmeldinger>;
    setInntektsmeldinger: (saksnummer: string, data: Inntektsmeldinger) => void;
    getInntektsmeldinger: (saksnummer: string) => Inntektsmeldinger | undefined;
}

export const InnsynsdataContext = createContext<InnsynsdataContextData>(null!);

interface Props {
    innsynsdata: Innsynsdata;
    children: ReactNode;
}

type InntektsmeldingerCache = Record<string, Inntektsmeldinger>;

const initInntektsmeldingerCache = (saker: PleietrengendeMedSak[]): InntektsmeldingerCache => {
    const cache: InntektsmeldingerCache = {};
    saker.every((sak) => {
        cache[sak.sak.saksnummer] = sak.inntektsmeldinger;
    });
    return cache;
};

export const InnsynsdataContextProvider: FunctionComponent<Props> = ({ children, innsynsdata }) => {
    const [inntektsmeldingerCache, setCache] = useState<InntektsmeldingerCache>(
        initInntektsmeldingerCache(innsynsdata.saker),
    );

    const setInntektsmeldinger = (saksnummer: string, data: Inntektsmeldinger) => {
        setCache((prev) => ({ ...prev, [saksnummer]: data }));
    };

    const getInntektsmeldinger = (saksnummer: string) => {
        return inntektsmeldingerCache[saksnummer];
    };

    return (
        <InnsynsdataContext.Provider
            value={{ innsynsdata, inntektsmeldingerCache, setInntektsmeldinger, getInntektsmeldinger }}>
            {children}
        </InnsynsdataContext.Provider>
    );
};
