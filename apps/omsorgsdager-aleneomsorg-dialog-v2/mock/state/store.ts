import { createStore } from '@sif/mock-utils';

import { getScenarioMockData } from '../scenarios/scenarioer';
import { ScenarioData, ScenarioType } from '../scenarios/types';

export const store = createStore<ScenarioData, ScenarioType>({
    storageKey: 'OMS_ALENE_V2_MOCK_DATA',
    scenarioKey: 'OMS_ALENE_V2_MOCK_SCENARIO',
    getScenarioData: getScenarioMockData,
    scenarioValues: Object.values(ScenarioType),
    defaultScenario: ScenarioType.default,
});
