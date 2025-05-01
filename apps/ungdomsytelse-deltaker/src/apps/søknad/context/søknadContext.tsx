import React, { createContext, useState } from 'react';
import { RegistrertBarn, Søker } from '@navikt/sif-common-api';
import { YesOrNo } from '@navikt/sif-common-core-ds/src';
import { useSøknadNavigation } from '../hooks/utils/useSøknadNavigation';
import { Spørsmål, Steg, SøknadContextType, SøknadSvar } from '../types';
import { MellomlagringDTO } from '../api/mellomlagring/mellomlagring';

export const SøknadContext = createContext<SøknadContextType | undefined>(undefined);

interface SøknadProviderProps {
    children: React.ReactNode;
    barn: RegistrertBarn[];
    kontonummer?: string;
    mellomlagring?: MellomlagringDTO;
    søker: Søker;
    deltakelsePeriode;
}

// const initialData: SøknadSvar = {};
const initialData: SøknadSvar = {
    barn: YesOrNo.YES,
    kontonummer: YesOrNo.YES,
    oppstart: YesOrNo.YES,
    harForståttRettigheterOgPlikter: true,
};

export const SøknadProvider = ({
    children,
    kontonummer,
    barn,
    mellomlagring,
    deltakelsePeriode,
    søker,
}: SøknadProviderProps) => {
    const [svar, setSvar] = useState<SøknadSvar>(mellomlagring?.søknad || initialData);
    const { gotoSteg, gotoVelkommenPage } = useSøknadNavigation();

    const [søknadSendt, setSøknadSendt] = useState(false);
    const [søknadStartet, setSøknadStartet] = useState(initialData.harForståttRettigheterOgPlikter ? true : false);

    const oppdaterSvar = (key: Spørsmål, value: YesOrNo | boolean | undefined) => {
        setSvar((prev) => ({ ...prev, [key]: value }));
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
                deltakelsePeriode,
                søker,
                setSpørsmålSvar: oppdaterSvar,
                setSøknadSendt,
                startSøknad,
                avbrytOgSlett,
            }}>
            {children}
        </SøknadContext.Provider>
    );
};
