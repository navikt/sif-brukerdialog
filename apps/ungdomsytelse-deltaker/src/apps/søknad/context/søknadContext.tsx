import React, { createContext, useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RegistrertBarn } from '@navikt/sif-common-api';
import { YesOrNo } from '@navikt/sif-common-core-ds/src';
import { MellomlagringDTO } from '../../../api/mellomlagring/mellomlagring';
import { Steg } from '../types/Steg';
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
    søknadSendt: boolean;
    kontonummer?: string;
    barn: RegistrertBarn[];
    oppdaterSvar: (key: Spørsmål, value: unknown | undefined) => void;
    setAktivtSteg: (steg: Steg) => void;
    setSøknadSendt: (sendtInn: boolean) => void;
    startSøknad: () => void;
    sendInnSøknad: () => void;
    avbrytOgSlett: () => void;
}

const SøknadContext = createContext<SøknadContextType | undefined>(undefined);

interface SøknadProviderProps {
    children: React.ReactNode;
    barn: RegistrertBarn[];
    kontonummer?: string;
    mellomlagring?: MellomlagringDTO;
}

export const SøknadProvider = ({ children, kontonummer, barn, mellomlagring }: SøknadProviderProps) => {
    const [svar, setSvar] = useState<SøknadSvar>({
        ...mellomlagring?.søknad,
        // bekrefter: true,
        // barn: YesOrNo.YES,
        // kontonummer: YesOrNo.YES,
        // oppstart: YesOrNo.YES,
    });

    const { pathname } = useLocation();
    const stegIPath = getStegFraPath(pathname);
    const [aktivtSteg, setAktivtSteg] = useState<Steg>(stegIPath || Steg.VELKOMMEN);
    const [søknadSendt, setSøknadSendt] = useState(false);

    const navigate = useNavigate();

    if (søknadSendt && getStegFraPath(pathname) !== Steg.KVITTERING) {
        navigate('soknad/kvittering');
    }

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

    const doSetSøknadSendt = (sendtInn: boolean) => {
        setSøknadSendt(sendtInn);
    };

    const sendInnSøknad = () => {};

    const avbrytOgSlett = () => {
        setSvar({});
        doSetAktivtSteg(Steg.VELKOMMEN);
    };

    const startSøknad = () => {
        console.log('start');
        doSetAktivtSteg(Steg.OPPSTART);
    };

    return (
        <SøknadContext.Provider
            value={{
                svar,
                aktivtSteg,
                søknadSendt,
                kontonummer,
                barn,
                oppdaterSvar,
                setAktivtSteg: doSetAktivtSteg,
                setSøknadSendt: doSetSøknadSendt,
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
