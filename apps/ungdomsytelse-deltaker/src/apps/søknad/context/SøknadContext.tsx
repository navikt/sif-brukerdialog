import React, { createContext, useMemo, useState } from 'react';
import { UngdomsytelseDeltakerApp } from '@navikt/sif-app-register';
import { RegistrertBarn, Søker } from '@navikt/sif-common-api';
import { YesOrNo } from '@navikt/sif-common-core-ds/src';
import { ApplikasjonHendelse, useAnalyticsInstance } from '../../../analytics/analytics';
import { DeltakelsePeriode } from '../../../types/DeltakelsePeriode';
import { DeltakerSkjemaId } from '../../../types/DeltakerSkjemaId';
import { SøkYtelseOppgave } from '../../../types/Oppgave';
import { logUtils } from '../../innsyn/utils/logUtils';
import { useSøknadNavigation } from '../hooks/utils/useSøknadNavigation';
import { KontonummerInfo, Spørsmål, Steg, SøknadContextType, SøknadSvar } from '../types';

export const SøknadContext = createContext<SøknadContextType | undefined>(undefined);

interface SøknadProviderProps {
    children: React.ReactNode;
    barn: RegistrertBarn[];
    kontonummerInfo: KontonummerInfo;
    søker: Søker;
    initialSvar?: SøknadSvar;
    søknadOppgave: SøkYtelseOppgave;
    deltakelsePeriode: DeltakelsePeriode;
}

const initialData: SøknadSvar = {};

export const SøknadProvider = ({
    children,
    kontonummerInfo,
    barn,
    søknadOppgave,
    deltakelsePeriode,
    initialSvar,
    søker,
}: SøknadProviderProps) => {
    const [svar, setSvar] = useState<SøknadSvar>(initialSvar || initialData);
    const { gotoSteg, gotoVelkommenPage } = useSøknadNavigation();
    const { logHendelse, logSkjemaStartet, logSkjemaFullført } = useAnalyticsInstance();

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
        logSkjemaStartet(UngdomsytelseDeltakerApp.key);
        gotoSteg(Steg.KONTONUMMER);
    };

    const doSetSøknadSendt = () => {
        setSøknadSendt(true);
        logSkjemaFullført(
            DeltakerSkjemaId.SØKNAD,
            logUtils.getSøknadInnsendingMeta(deltakelsePeriode, søknadOppgave, {
                antallBarn: barn.length,
                barnStemmer: svar[Spørsmål.BARN] === YesOrNo.YES,
                harKontonummer: kontonummerInfo.harKontonummer !== undefined,
                kontonummerStemmer: svar[Spørsmål.KONTONUMMER] === YesOrNo.YES,
            }),
        );
    };

    const value: SøknadContextType = useMemo(
        () => ({
            svar,
            søknadSendt,
            kontonummerInfo,
            barn,
            søknadOppgave,
            søknadStartet,
            deltakelsePeriode,
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
            søknadOppgave,
            søknadStartet,
            deltakelsePeriode,
            søker,
            oppdaterSvar,
            doSetSøknadSendt,
            startSøknad,
            avbrytOgSlett,
        ],
    );

    return <SøknadContext.Provider value={value}>{children}</SøknadContext.Provider>;
};
