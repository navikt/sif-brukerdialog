import { getScenarioMockData } from '../scenarios/scenarioMap';
import { ScenarioData, ScenarioType } from '../scenarios/types';

const STORAGE_KEY = 'MOCK_DATA';
const SCENARIO_KEY = 'MOCK_SCENARIO';

export const localStorageStore = {
    init: (scenario: ScenarioType) => {
        const current = localStorage.getItem(SCENARIO_KEY);
        if (!current) {
            localStorageStore.setScenario(scenario);
        }
    },
    setScenario: (scenario: ScenarioType) => {
        localStorage.setItem(SCENARIO_KEY, scenario);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(getScenarioMockData(scenario)));
    },

    getScenario: (): ScenarioType => {
        const current = localStorage.getItem(SCENARIO_KEY);
        return current ? (current as ScenarioType) : ScenarioType.harSøkt;
    },

    get: () => {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : {};
    },

    set: (state: ScenarioData) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    },

    reset: () => {
        const key = localStorage.getItem(SCENARIO_KEY) as ScenarioType;
        if (!key) throw new Error('Ingen scenario valgt i localStorage');
        localStorage.setItem(STORAGE_KEY, JSON.stringify(getScenarioMockData(key)));
    },
};
