import { createStore } from '@sif/api/mock-utils';

import { getScenarioMockData } from '../scenarios/scenarioer';
import { ScenarioData, ScenarioType } from '../scenarios/types';

export const store = createStore<ScenarioData, ScenarioType>({
    storageKey: 'UPY_DELTAKER_MOCK_DATA',
    scenarioKey: 'UPY_DELTAKER_MOCK_SCENARIO',
    getScenarioData: getScenarioMockData,
    scenarioValues: Object.values(ScenarioType),
    defaultScenario: ScenarioType.søknad,
});
