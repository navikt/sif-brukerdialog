import { AktivitetspengerApp } from '@navikt/sif-app-register';
import { YesOrNo } from '@navikt/sif-common-core-ds/src';
import { RegistrertBarn, Søker } from '@navikt/sif-common-query';
import React, { createContext, useMemo, useState } from 'react';

import { ApplikasjonHendelse, useAnalyticsInstance } from '../../analytics/analytics';
import { useSøknadNavigation } from '../hooks/utils/useSøknadNavigation';
import { KontonummerOppslagInfo, SøknadContextType, SøknadSvar, Spørsmål, Steg } from '../types';

export const SøknadContext = createContext<SøknadContextType | undefined>(undefined);

interface SøknadProviderProps {
    children: React.ReactNode;
    barn: RegistrertBarn[];
    kontonummerInfo: KontonummerOppslagInfo;
    søker: Søker;
    initialSvar?: SøknadSvar;
}

const initialData: SøknadSvar = {};

export const SøknadProvider = ({ children, kontonummerInfo, barn, initialSvar, søker }: SøknadProviderProps) => {
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
        // logSkjemaFullført(
        //     DeltakerSkjemaId.SØKNAD,
        //     logUtils.getSøknadInnsendingMeta(deltakelsePeriode, søknadOppgave, {
        //         antallBarn: barn.length,
        //         barnStemmer: svar[Spørsmål.BARN] === YesOrNo.YES,
        //         kontonummerStemmer: svar[Spørsmål.KONTONUMMER] === YesOrNo.YES,
        //         kontonummerOppslagInfo: kontonummerInfo,
        //     }),
        // );
    };

    const value: SøknadContextType = useMemo(
        () => ({
            svar,
            søknadSendt,
            kontonummerInfo,
            barn,
            søknadStartet,
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
            barn,
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
