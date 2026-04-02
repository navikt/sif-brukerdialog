import { getScenarioMockData } from '../scenarios/scenarioer';
import { ScenarioData, ScenarioType } from '../scenarios/types';

const STORAGE_KEY = 'AKT_INNSYN_MOCK_DATA';
const SCENARIO_KEY = 'AKT_INNSYN_MOCK_SCENARIO';

export const localStorageStore = {
    init: (scenario: ScenarioType) => {
        const currentScenario = localStorage.getItem(SCENARIO_KEY);
        const currentData = localStorage.getItem(STORAGE_KEY);

        if (currentScenario && Object.values(ScenarioType).includes(currentScenario as ScenarioType) && !currentData) {
            localStorageStore.setScenario(currentScenario as ScenarioType);
            return;
        }

        if (!currentScenario || !currentData) {
            localStorageStore.setScenario(scenario);
            return;
        }

        if (!Object.values(ScenarioType).includes(currentScenario as ScenarioType)) {
            localStorageStore.setScenario(scenario);
        }
    },
    setScenario: (scenario: ScenarioType) => {
        localStorage.setItem(SCENARIO_KEY, scenario);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(getScenarioMockData(scenario)));
    },
    getScenario: (): ScenarioType => {
        const current = localStorage.getItem(SCENARIO_KEY);
        if (current && Object.values(ScenarioType).includes(current as ScenarioType)) {
            return current as ScenarioType;
        }
        return ScenarioType.default;
    },
    get: (): ScenarioData => {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : getScenarioMockData(ScenarioType.default);
    },
    set: (state: ScenarioData) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    },
    update: (partial: Partial<ScenarioData>) => {
        const current = localStorageStore.get();
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...current, ...partial }));
    },
    reset: () => {
        const key = localStorage.getItem(SCENARIO_KEY) as ScenarioType;
        if (!key) throw new Error('Ingen scenario valgt i localStorage');
        localStorage.setItem(STORAGE_KEY, JSON.stringify(getScenarioMockData(key)));
    },
};
