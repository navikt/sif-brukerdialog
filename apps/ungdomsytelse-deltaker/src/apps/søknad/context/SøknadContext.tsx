import React, { createContext, useState } from 'react';
import { UngdomsytelseDeltakerApp } from '@navikt/sif-app-register';
import { RegistrertBarn, Søker } from '@navikt/sif-common-api';
import { YesOrNo } from '@navikt/sif-common-core-ds/src';
import { DeltakelsePeriode, formaterKontonummer } from '@navikt/ung-common';
import { ApplikasjonHendelse, useAnalyticsInstance } from '../../../utils/analytics';
import { MellomlagringDTO } from '../api/mellomlagring/mellomlagring';
import { useSøknadNavigation } from '../hooks/utils/useSøknadNavigation';
import { Spørsmål, Steg, SøknadContextType, SøknadSvar } from '../types';

export const SøknadContext = createContext<SøknadContextType | undefined>(undefined);

interface SøknadProviderProps {
    children: React.ReactNode;
    barn: RegistrertBarn[];
    kontonummer?: string;
    mellomlagring?: MellomlagringDTO;
    søker: Søker;
    deltakelsePeriode: DeltakelsePeriode;
}

const initialData: SøknadSvar = {};
// const initialData: SøknadSvar = {
//     barn: YesOrNo.YES,
//     kontonummer: YesOrNo.YES,
//     harForståttRettigheterOgPlikter: true,
// };

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
    const { logHendelse, logInfo, logSoknadStartet, logSoknadSent } = useAnalyticsInstance();

    const [søknadSendt, setSøknadSendt] = useState(false);
    const [søknadStartet, setSøknadStartet] = useState(initialData.harForståttRettigheterOgPlikter ? true : false);

    const oppdaterSvar = (key: Spørsmål, value: YesOrNo | boolean | undefined) => {
        setSvar((prev) => ({ ...prev, [key]: value }));
    };

    const avbrytOgSlett = () => {
        setSvar({});
        setSøknadStartet(false);
        logHendelse(ApplikasjonHendelse.avbryt);
        gotoVelkommenPage();
    };

    const startSøknad = (harForståttRettigheterOgPlikter: boolean) => {
        setSvar({
            harForståttRettigheterOgPlikter,
        });
        setSøknadStartet(true);
        logSoknadStartet(UngdomsytelseDeltakerApp.key);
        gotoSteg(Steg.KONTONUMMER);
    };

    const doSetSøknadSendt = () => {
        setSøknadSendt(true);
        logSoknadSent(UngdomsytelseDeltakerApp.key);
        logInfo({
            harBarn: barn.length > 0,
            barnStemmer: svar[Spørsmål.BARN] === YesOrNo.YES,
            harKontonummer: kontonummer ? true : false,
            kontonummerStemmer: svar[Spørsmål.KONTONUMMER] === YesOrNo.YES,
        });
    };

    return (
        <SøknadContext.Provider
            value={{
                svar,
                søknadSendt,
                kontonummerInfo: kontonummer
                    ? {
                          harKontonummer: true,
                          kontonummerFraRegister: kontonummer,
                          formatertKontonummer: formaterKontonummer(kontonummer),
                      }
                    : {
                          harKontonummer: false,
                      },
                barn,
                søknadStartet,
                deltakelsePeriode,
                søker,
                setSpørsmålSvar: oppdaterSvar,
                setSøknadSendt: doSetSøknadSendt,
                startSøknad,
                avbrytOgSlett,
            }}>
            {children}
        </SøknadContext.Provider>
    );
};
