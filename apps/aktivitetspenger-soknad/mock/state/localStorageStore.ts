import { getScenarioMockData } from '../scenarios/scenarioer';
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

        // Sjekk om current er en gyldig ScenarioType
        if (current && Object.values(ScenarioType).includes(current as ScenarioType)) {
            return current as ScenarioType;
        }

        return ScenarioType.søknad;
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
