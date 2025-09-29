import { Theme } from '@navikt/ds-react';
import { barnResponseSchema } from '@navikt/sif-common-api';

import { getScenarioMockData } from '../../mock/scenarios/scenarioMap';
import { ScenarioType } from '../../mock/scenarios/types';
import { SøknadProvider } from '../../src/apps/søknad/context/SøknadContext';
import { HarKontonummerEnum } from '../../src/apps/søknad/steg/oppsummering/oppsummeringUtils';
import { SøknadContextType } from '../../src/apps/søknad/types';
import { DeltakelsePeriode, deltakelsePeriodeSchema } from '../../src/types/DeltakelsePeriode';
import { SøkYtelseOppgave } from '../../src/types/Oppgave';

const data = getScenarioMockData(ScenarioType.harIkkeSøkt);

export const withSøknadContext = (Story: any, context?: Partial<SøknadContextType>) => {
    const deltakelse = deltakelsePeriodeSchema.parse(data.deltakelser[0]);
    const { barn } = barnResponseSchema.parse(data.barn);

    return (
        <Theme>
            <SøknadProvider
                barn={context?.barn || barn}
                kontonummerInfo={context?.kontonummerInfo || { harKontonummer: HarKontonummerEnum.UVISST }}
                deltakelsePeriode={deltakelse as DeltakelsePeriode}
                søker={data.søker}
                initialSvar={context?.svar}
                søknadOppgave={deltakelse.oppgaver[0] as SøkYtelseOppgave}>
                <Story />
            </SøknadProvider>
        </Theme>
    );
};
