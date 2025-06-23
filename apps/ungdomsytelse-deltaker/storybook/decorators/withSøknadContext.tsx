import { DeltakelsePeriode, deltakelsePeriodeSchema, SøkYtelseOppgave } from '@navikt/ung-common';
import { getScenarioMockData } from '../../mock/scenarios/scenarioMap';
import { ScenarioType } from '../../mock/scenarios/types';
import { SøknadProvider } from '../../src/apps/søknad/context/SøknadContext';
import { barnResponseSchema } from '@navikt/sif-common-api';
import { SøknadContextType } from '../../src/apps/søknad/types';
import { Theme } from '@navikt/ds-react';

const data = getScenarioMockData(ScenarioType.harIkkeSøkt);

export const withSøknadContext = (Story: any, context?: Partial<SøknadContextType>) => {
    const deltakelse = deltakelsePeriodeSchema.parse(data.deltakelser[0]);
    const { barn } = barnResponseSchema.parse(data.barn);

    return (
        <Theme>
            <SøknadProvider
                barn={context?.barn || barn}
                kontonummer={
                    context?.kontonummerInfo?.harKontonummer
                        ? context.kontonummerInfo.kontonummerFraRegister
                        : undefined
                }
                deltakelsePeriode={deltakelse as DeltakelsePeriode}
                søker={data.søker}
                initialSvar={context?.svar}
                søknadOppgave={deltakelse.oppgaver[0] as SøkYtelseOppgave}>
                <Story />
            </SøknadProvider>
        </Theme>
    );
};
