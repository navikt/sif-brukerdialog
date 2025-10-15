import { getScenarioMockData } from '../scenarios/scenarioer';
import { ScenarioData, ScenarioType } from '../scenarios/types';

let currentScenario: ScenarioType;
let currentData: ScenarioData;

export const memoryStore = {
    init: (scenario: ScenarioType) => {
        currentScenario = ScenarioType.søknad;
        currentData = getScenarioMockData(currentScenario);
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
