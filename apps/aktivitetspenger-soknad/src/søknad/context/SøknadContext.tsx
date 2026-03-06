import { AktivitetspengerApp } from '@navikt/sif-app-register';
import { YesOrNo } from '@navikt/sif-common-core-ds/src';
import { RegistrertBarn, Søker } from '@navikt/sif-common-query';
import React, { createContext, useMemo, useState } from 'react';

import { ApplikasjonHendelse, useAnalyticsInstance } from '../../analytics/analytics';
import { useSøknadNavigation } from '../../hooks/utils/useSøknadNavigation';
import { KontonummerOppslagInfo, SøknadContextType, SøknadSvar, Spørsmål, Steg } from '../types';

export const SøknadContext = createContext<SøknadContextType | undefined>(undefined);

interface SøknadProviderProps {
    children: React.ReactNode;
    registrerteBarn: RegistrertBarn[];
    kontonummerInfo: KontonummerOppslagInfo;
    søker: Søker;
    initialSvar?: SøknadSvar;
}

const initialData: SøknadSvar = {};

export const SøknadProvider = ({
    children,
    kontonummerInfo,
    registrerteBarn,
    initialSvar,
    søker,
}: SøknadProviderProps) => {
    const [svar, setSvar] = useState<SøknadSvar>(initialSvar || initialData);
    const { gotoSteg, gotoVelkommenPage } = useSøknadNavigation();
    const { logHendelse, logSkjemaStartet } = useAnalyticsInstance();

    const [søknadSendt, setSøknadSendt] = useState(false);
    const [søknadStartet, setSøknadStartet] = useState(initialData.harForståttRettigheterOgPlikter || false);

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
        logSkjemaStartet(AktivitetspengerApp.key);
        gotoSteg(Steg.KONTONUMMER);
    };

    const doSetSøknadSendt = () => {
        setSøknadSendt(true);
    };

    const value: SøknadContextType = useMemo(
        () => ({
            søknadsdata: {
                svar,
                søknadStartet,
                søknadSendt,
            },
            kontonummerInfo,
            registrerteBarn,
            søker,
            setSpørsmålSvar: oppdaterSvar,
            setSøknadSendt: doSetSøknadSendt,
            startSøknad,
            avbrytOgSlett,
        }),
        [
            svar,
            søknadSendt,
            kontonummerInfo,
            registrerteBarn,
            søknadStartet,
            søker,
            oppdaterSvar,
            doSetSøknadSendt,
            startSøknad,
            avbrytOgSlett,
        ],
    );

    return <SøknadContext.Provider value={value}>{children}</SøknadContext.Provider>;
};
