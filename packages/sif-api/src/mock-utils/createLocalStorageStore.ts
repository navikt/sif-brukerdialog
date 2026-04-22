import { MockStore, MockStoreConfig } from './types';

interface LocalStorageStoreConfig<TData, TScenario extends string> extends MockStoreConfig<TData, TScenario> {
    storageKey: string;
    scenarioKey: string;
}

export const createLocalStorageStore = <TData, TScenario extends string>(
    config: LocalStorageStoreConfig<TData, TScenario>,
): MockStore<TData, TScenario> => {
    const { storageKey, scenarioKey, getScenarioData, scenarioValues, defaultScenario } = config;

    const isValidScenario = (value: string): value is TScenario => scenarioValues.includes(value as TScenario);

    const store: MockStore<TData, TScenario> = {
        init: (scenario) => {
            const current = localStorage.getItem(scenarioKey);
            const hasData = localStorage.getItem(storageKey) !== null;

            if (hasData && current === scenario) {
                return;
            }

            store.setScenario(scenario);
        },
        setScenario: (scenario) => {
            localStorage.setItem(scenarioKey, scenario);
            localStorage.setItem(storageKey, JSON.stringify(getScenarioData(scenario)));
        },
        getScenario: () => {
            const current = localStorage.getItem(scenarioKey);
            if (current && isValidScenario(current)) {
                return current;
            }
            return defaultScenario;
        },
        get: () => {
            const raw = localStorage.getItem(storageKey);
            return raw ? JSON.parse(raw) : getScenarioData(defaultScenario);
        },
        set: (state) => {
            localStorage.setItem(storageKey, JSON.stringify(state));
        },
        update: (partial) => {
            const current = store.get();
            localStorage.setItem(storageKey, JSON.stringify({ ...current, ...partial }));
        },
        reset: () => {
            const scenario = store.getScenario();
            localStorage.setItem(scenarioKey, scenario);
            localStorage.setItem(storageKey, JSON.stringify(getScenarioData(scenario)));
        },
    };

    return store;
};
