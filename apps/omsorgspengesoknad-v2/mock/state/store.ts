import { createStore } from '@sif/api/mock-utils';

import { getScenarioMockData } from '../scenarios/scenarioer';
import { ScenarioData, ScenarioType } from '../scenarios/types';

export const store = createStore<ScenarioData, ScenarioType>({
    storageKey: 'OMP_SOKNAD_MOCK_DATA',
    scenarioKey: 'OMP_SOKNAD_MOCK_SCENARIO',
    getScenarioData: getScenarioMockData,
    scenarioValues: Object.values(ScenarioType),
    defaultScenario: ScenarioType.default,
});
