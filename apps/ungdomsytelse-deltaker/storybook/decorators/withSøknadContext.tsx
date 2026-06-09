import { Theme } from '@navikt/ds-react';
import { useEffect, useMemo, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { getScenarioMockData } from '../../mock/scenarios/scenarioer';
import { ScenarioType } from '../../mock/scenarios/types';
import { DeltakerContextProvider } from '../../src/context/DeltakerContext';
import { deltakelsePeriodeSchema } from '../../src/types/DeltakelsePeriode';
import { SøknadContextProvider } from '../../src/apps/søknad/setup/context/søknadContext';
import { SøknadStepId } from '../../src/apps/søknad/setup/config/SøknadStepId';
import { useSøknadStore } from '../../src/apps/søknad/setup/hooks/useSøknadStore';
import { useStepTitles } from '../../src/apps/søknad/setup/hooks/useStepTitles';
import { Søknadsdata } from '../../src/apps/søknad/setup/types/Søknadsdata';
import { HarKontonummerEnum } from '../../src/apps/søknad/steg/oppsummering/oppsummeringUtils';
import StoryIntlProvider from '../components/StoryIntlProvider';

interface SøknadStoryContext {
    currentStepId?: SøknadStepId;
    søknadsdata?: Søknadsdata;
    barn?: any[];
    kontonummerInfo?: any;
}

const data = getScenarioMockData(ScenarioType.søknad);

const StorySøknadContext = ({ Story, context }: { Story: any; context?: SøknadStoryContext }) => {
    const stepTitles = useStepTitles();
    const [isInitialized, setIsInitialized] = useState(false);
    const deltakelsePeriode = deltakelsePeriodeSchema.parse(data.deltakelser[0]);
    const barn = useMemo(
        () =>
            context?.barn ??
            data.barn.barn.map((registrertBarn) => ({
                ...registrertBarn,
                fødselsdato: new Date(registrertBarn.fødselsdato),
            })),
        [context?.barn],
    );
    const kontonummerInfo = useMemo(
        () =>
            context?.kontonummerInfo ?? {
                harKontonummer: HarKontonummerEnum.JA,
                kontonummerFraRegister: '11112233333',
                formatertKontonummer: '1111.22.33333',
            },
        [context?.kontonummerInfo],
    );
    const søknadOppgave = data.oppgaver[0];

    useEffect(() => {
        useSøknadStore.getState().init(
            {
                søker: data.søker,
                barn,
                kontoInfo: kontonummerInfo,
                søknadOppgave,
            },
            context?.søknadsdata,
            context?.currentStepId,
        );
        setIsInitialized(true);

        return () => {
            useSøknadStore.getState().resetSøknad();
        };
    }, [barn, context?.currentStepId, context?.søknadsdata, kontonummerInfo, søknadOppgave]);

    if (!isInitialized) {
        return null;
    }

    return (
        <Theme>
            <DeltakerContextProvider
                søker={data.søker}
                deltakelsePeriode={deltakelsePeriode}
                oppgaver={data.oppgaver}
                refetchDeltakelser={async () => undefined}>
                <SøknadContextProvider stepTitles={stepTitles}>
                    <Story />
                </SøknadContextProvider>
            </DeltakerContextProvider>
        </Theme>
    );
};

export const withSøknadContext = (Story: any, context?: SøknadStoryContext) => (
    <BrowserRouter>
        <StoryIntlProvider>
            <StorySøknadContext Story={Story} context={context} />
        </StoryIntlProvider>
    </BrowserRouter>
);
