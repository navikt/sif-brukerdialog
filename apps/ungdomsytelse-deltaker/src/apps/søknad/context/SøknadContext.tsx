import React, { createContext, useState } from 'react';
import { UngdomsytelseDeltakerApp } from '@navikt/sif-app-register';
import { RegistrertBarn, Søker } from '@navikt/sif-common-api';
import { YesOrNo } from '@navikt/sif-common-core-ds/src';
import { ApplikasjonHendelse, useAnalyticsInstance } from '../../../utils/analytics';
import { LogMetaInfoType, logUtils } from '../../innsyn/utils/logUtils';
import { MellomlagringDTO } from '../api/mellomlagring/mellomlagring';
import { useSøknadNavigation } from '../hooks/utils/useSøknadNavigation';
import { Spørsmål, Steg, SøknadContextType, SøknadSvar } from '../types';
import { SøkYtelseOppgave } from '../../../types/Oppgave';
import { DeltakelsePeriode } from '../../../types/DeltakelsePeriode';
import { formaterKontonummer } from '../utils/formaterKontonummer';

export const SøknadContext = createContext<SøknadContextType | undefined>(undefined);

interface SøknadProviderProps {
    children: React.ReactNode;
    barn: RegistrertBarn[];
    kontonummer?: string;
    mellomlagring?: MellomlagringDTO;
    søker: Søker;
    initialSvar?: SøknadSvar;
    søknadOppgave: SøkYtelseOppgave;
    deltakelsePeriode: DeltakelsePeriode;
}

const initialData: SøknadSvar = {};

export const SøknadProvider = ({
    children,
    kontonummer,
    barn,
    søknadOppgave,
    deltakelsePeriode,
    initialSvar,
    søker,
}: SøknadProviderProps) => {
    const [svar, setSvar] = useState<SøknadSvar>(initialSvar || initialData);
    const { gotoSteg, gotoVelkommenPage } = useSøknadNavigation();
    const { logHendelse, logEvent, logSoknadStartet, logSoknadSent } = useAnalyticsInstance();

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
        logEvent(
            LogMetaInfoType.SØKNAD_SENDT,
            logUtils.getSøknadInnsendingMeta(deltakelsePeriode, søknadOppgave, {
                antallBarn: barn.length,
                barnStemmer: svar[Spørsmål.BARN] === YesOrNo.YES,
                harKontonummer: kontonummer ? true : false,
                kontonummerStemmer: svar[Spørsmål.KONTONUMMER] === YesOrNo.YES,
            }),
        );
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
                søknadOppgave,
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
