import { MockStore, MockStoreConfig } from './types';

export const createMemoryStore = <TData, TScenario extends string>(
    config: MockStoreConfig<TData, TScenario>,
): MockStore<TData, TScenario> => {
    let currentScenario: TScenario;
    let currentData: TData;

    const store: MockStore<TData, TScenario> = {
        init: (scenario) => {
            currentScenario = config.defaultScenario;
            currentData = config.getScenarioData(currentScenario);
            store.setScenario(scenario);
        },
        setScenario: (scenario) => {
            currentScenario = scenario;
            currentData = structuredClone(config.getScenarioData(scenario));
        },
        getScenario: () => currentScenario,
        get: () => currentData,
        set: (state) => {
            currentData = state;
        },
        update: (partial) => {
            currentData = { ...currentData, ...partial };
        },
        reset: () => {
            if (currentScenario === undefined) throw new Error('Scenario is not set.');
            currentData = structuredClone(config.getScenarioData(currentScenario));
        },
    };

    return store;
};
