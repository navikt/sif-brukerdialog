import { søkerResponseSchema } from '@navikt/sif-common-api';

import { getScenarioMockData } from '../../mock/scenarios/scenarioer';
import { ScenarioType } from '../../mock/scenarios/types';
import { DeltakerContextProvider } from '../../src/context/DeltakerContext';
import { deltakelsePeriodeSchema } from '../../src/types/DeltakelsePeriode';

export const withDeltakerContext = (Story) => {
    const { søker, deltakelser } = getScenarioMockData(ScenarioType.søknadSendt);
    return (
        <DeltakerContextProvider
            søker={søkerResponseSchema.parse(søker)}
            deltakelsePeriode={deltakelsePeriodeSchema.parse(deltakelser[0])}
            refetchDeltakelser={async () => {}}>
            <Story />
        </DeltakerContextProvider>
    );
};
