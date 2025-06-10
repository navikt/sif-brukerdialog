import { getScenarioMockData } from '../scenarios/scenarioMap';
import { ScenarioData, ScenarioType } from '../scenarios/types';

let currentScenario: ScenarioType = ScenarioType.harSøkt;
let currentData: ScenarioData = getScenarioMockData(currentScenario);

export const memoryStore = {
    init: (scenario: ScenarioType) => {
        memoryStore.setScenario(scenario);
    },
    setScenario: (scenario: ScenarioType) => {
        currentScenario = scenario;
        currentData = structuredClone(getScenarioMockData(scenario));
    },
    getScenario: () => currentScenario,
    get: (): ScenarioData => currentData,
    set: (state: ScenarioData) => (currentData = state),
    reset: () => {
        if (currentScenario === undefined) throw new Error('Scenario is not set.');
        currentData = structuredClone(getScenarioMockData(currentScenario));
    },
};
