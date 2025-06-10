import { søkerResponseSchema } from '@navikt/sif-common-api';
import { deltakelsePeriodeSchema } from '@navikt/ung-common';
import { getScenarioMockData } from '../../mock/scenarios/scenarioMap';
import { DeltakerContextProvider } from '../../src/context/DeltakerContext';
import { ScenarioType } from '../../mock/scenarios/types';

export const withDeltakerContext = (Story) => {
    const { søker, deltakelser } = getScenarioMockData(ScenarioType.harSøkt);
    return (
        <DeltakerContextProvider
            søker={søkerResponseSchema.parse(søker)}
            deltakelsePeriode={deltakelsePeriodeSchema.parse(deltakelser[0])}
            refetchDeltakelser={async () => {}}>
            <Story />
        </DeltakerContextProvider>
    );
};
