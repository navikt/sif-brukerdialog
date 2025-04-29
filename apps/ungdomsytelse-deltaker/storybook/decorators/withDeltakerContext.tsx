import { DeltakerContextProvider } from '../../src/context/DeltakerContext';
import { getScenarioMockData } from '../../mock/msw/mocks/scenarioes';
import { ScenarioType } from '../../src/dev/scenarioer';

export const withDeltakerContext = (Story) => {
    const { søker, deltakelser } = getScenarioMockData(ScenarioType.harSøkt);
    return (
        <DeltakerContextProvider søker={søker} deltakelse={deltakelser[0]} refetchDeltakelser={async () => {}}>
            <Story />
        </DeltakerContextProvider>
    );
};
