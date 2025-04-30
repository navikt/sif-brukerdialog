import React, { createContext, useContext, useState } from 'react';
import { RegistrertBarn } from '@navikt/sif-common-api';
import { YesOrNo } from '@navikt/sif-common-core-ds/src';
import { useSøknadNavigation } from '../hooks/useSøknadNavigation';
import { Steg } from '../types/Steg';
import { MellomlagringDTO } from '../../../api/mellomlagring/mellomlagring';

export enum Spørsmål {
    FORSTÅR_PLIKTER = 'harForståttRettigheterOgPlikter',
    OPPSTART = 'oppstart',
    BARN = 'barn',
    KONTONUMMER = 'kontonummer',
}

export type SøknadSvar = {
    [Spørsmål.FORSTÅR_PLIKTER]?: boolean;
    [Spørsmål.OPPSTART]?: YesOrNo;
    [Spørsmål.BARN]?: YesOrNo;
    [Spørsmål.KONTONUMMER]?: YesOrNo;
};

interface SøknadContextType {
    svar: SøknadSvar;
    søknadStartet: boolean;
    søknadSendt: boolean;
    kontonummer?: string;
    barn: RegistrertBarn[];
    setSpørsmålSvar: (key: Spørsmål, value: unknown | undefined) => void;
    setSøknadSendt: (sendtInn: boolean) => void;
    startSøknad: (bekrefter: true) => void;
    avbrytOgSlett: () => void;
}

const SøknadContext = createContext<SøknadContextType | undefined>(undefined);

interface SøknadProviderProps {
    children: React.ReactNode;
    barn: RegistrertBarn[];
    kontonummer?: string;
    mellomlagring?: MellomlagringDTO;
}

const initialData: SøknadSvar = {};
//     barn: YesOrNo.YES,
//     kontonummer: YesOrNo.YES,
//     oppstart: YesOrNo.YES,
//     harForståttRettigheterOgPlikter: true,
// };

export const SøknadProvider = ({ children, kontonummer, barn, mellomlagring }: SøknadProviderProps) => {
    const [svar, setSvar] = useState<SøknadSvar>(mellomlagring?.søknad || initialData);
    const { gotoSteg, gotoVelkommenPage } = useSøknadNavigation();

    const [søknadSendt, setSøknadSendt] = useState(false);
    const [søknadStartet, setSøknadStartet] = useState(initialData.harForståttRettigheterOgPlikter ? true : false);

    const oppdaterSvar = (key: Spørsmål, value: YesOrNo | boolean | undefined) => {
        setSvar((prev) => ({ ...prev, [key]: value }));
    };

    const doSetSøknadSendt = (sendtInn: boolean) => {
        setSøknadSendt(sendtInn);
    };

    const avbrytOgSlett = () => {
        setSvar({});
        setSøknadStartet(false);
        gotoVelkommenPage();
    };

    const startSøknad = (harForståttRettigheterOgPlikter: boolean) => {
        setSvar({
            harForståttRettigheterOgPlikter,
        });
        setSøknadStartet(true);
        gotoSteg(Steg.OPPSTART);
    };

    return (
        <SøknadContext.Provider
            value={{
                svar,
                søknadSendt,
                kontonummer,
                barn,
                søknadStartet,
                setSpørsmålSvar: oppdaterSvar,
                setSøknadSendt: doSetSøknadSendt,
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
