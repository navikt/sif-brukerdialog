import React, { createContext, useContext, useState } from 'react';
import { YesOrNo } from '@navikt/sif-common-core-ds/src';
import { Steg } from '../types/Steg';
import { useLocation, useNavigate } from 'react-router-dom';
import { getStegFraPath } from '../utils/stegUtils';

export enum Spørsmål {
    BEKREFTER = 'bekrefter',
    OPPSTART = 'oppstart',
    BARN = 'barn',
    KONTONUMMER = 'kontonummer',
}

export type SøknadSvar = {
    [Spørsmål.BEKREFTER]?: boolean;
    [Spørsmål.OPPSTART]?: YesOrNo;
    [Spørsmål.BARN]?: YesOrNo;
    [Spørsmål.KONTONUMMER]?: YesOrNo;
};

interface SøknadContextType {
    svar: SøknadSvar;
    aktivtSteg: Steg;
    erSendtInn: boolean;
    oppdaterSvar: (key: Spørsmål, value: unknown | undefined) => void;
    setAktivtSteg: (steg: Steg) => void;
    setErSendtInn: (sendtInn: boolean) => void;
    startSøknad: () => void;
    sendInnSøknad: () => void;
    avbrytOgSlett: () => void;
}

const SøknadContext = createContext<SøknadContextType | undefined>(undefined);

export const SøknadProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [svar, setSvar] = useState<SøknadSvar>({
        bekrefter: true,
        barn: YesOrNo.YES,
        kontonummer: YesOrNo.YES,
        oppstart: YesOrNo.YES,
    });

    const { pathname } = useLocation();
    const stegIPath = getStegFraPath(pathname);

    const [aktivtSteg, setAktivtSteg] = useState<Steg>(stegIPath || Steg.VELKOMMEN);
    const [erSendtInn, setErSendtInn] = useState(false);

    const navigate = useNavigate();

    const oppdaterSvar = (key: Spørsmål, value: YesOrNo | undefined) => {
        setSvar((prev) => ({ ...prev, [key]: value }));
    };

    const doSetAktivtSteg = (steg: Steg) => {
        setAktivtSteg(steg);
        if (steg === Steg.VELKOMMEN) {
            navigate('../');
        } else {
            navigate(`/soknad/${steg}`);
        }
    };

    const doSetErSendtInn = (sendtInn: boolean) => {
        setErSendtInn(sendtInn);
    };

    const sendInnSøknad = () => {};

    const avbrytOgSlett = () => {
        setSvar({});
        doSetAktivtSteg(Steg.VELKOMMEN);
    };

    const startSøknad = () => {
        doSetAktivtSteg(Steg.BARN);
    };

    return (
        <SøknadContext.Provider
            value={{
                svar,
                aktivtSteg,
                erSendtInn,
                oppdaterSvar,
                setAktivtSteg: doSetAktivtSteg,
                setErSendtInn: doSetErSendtInn,
                sendInnSøknad,
                startSøknad,
                avbrytOgSlett,
            }}>
            {children}
        </SøknadContext.Provider>
    );
};

export const useSøknadContext = () => {
    const context = useContext(SøknadContext);
    if (!context) {
        throw new Error('useSøknadContext må brukes innenfor en SkjemaProvider');
    }
    return context;
};
