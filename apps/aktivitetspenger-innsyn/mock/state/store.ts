import { createStore } from '@sif/api/mock-utils';

import { getScenarioMockData } from '../scenarios/scenarioer';
import { ScenarioData, ScenarioType } from '../scenarios/types';

export const store = createStore<ScenarioData, ScenarioType>({
    storageKey: 'AKT_INNSYN_MOCK_DATA',
    scenarioKey: 'AKT_INNSYN_MOCK_SCENARIO',
    getScenarioData: getScenarioMockData,
    scenarioValues: Object.values(ScenarioType),
    defaultScenario: ScenarioType.default,
});
