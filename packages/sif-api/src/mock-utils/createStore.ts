import { createLocalStorageStore } from './createLocalStorageStore';
import { createMemoryStore } from './createMemoryStore';
import { MockStoreConfig } from './types';

interface CreateStoreConfig<TData, TScenario extends string> extends MockStoreConfig<TData, TScenario> {
    storageKey: string;
    scenarioKey: string;
}

export const createStore = <TData, TScenario extends string>(config: CreateStoreConfig<TData, TScenario>) => {
    if (typeof window === 'undefined') {
        return createMemoryStore(config);
    }
    return createLocalStorageStore(config);
};
