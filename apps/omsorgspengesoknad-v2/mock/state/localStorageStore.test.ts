import { beforeEach, describe, expect, it } from 'vitest';

import { ScenarioType } from '../scenarios/types';
import { localStorageStore } from './localStorageStore';

const STORAGE_KEY = 'OMP_SOKNAD_MOCK_DATA';
const SCENARIO_KEY = 'OMP_SOKNAD_MOCK_SCENARIO';

const createLocalStorage = (): Storage => {
    const data = new Map<string, string>();

    return {
        get length() {
            return data.size;
        },
        clear: () => data.clear(),
        getItem: (key: string) => data.get(key) ?? null,
        key: (index: number) => Array.from(data.keys())[index] ?? null,
        removeItem: (key: string) => {
            data.delete(key);
        },
        setItem: (key: string, value: string) => {
            data.set(key, value);
        },
    };
};

describe('localStorageStore', () => {
    beforeEach(() => {
        Object.defineProperty(globalThis, 'localStorage', {
            value: createLocalStorage(),
            configurable: true,
            writable: true,
        });
        localStorage.clear();
    });

    it.skip('bruker scenario fra init når lagret scenario er et annet', () => {
        localStorage.setItem(SCENARIO_KEY, ScenarioType.default);
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({
                barn: { barn: [{ fornavn: 'Eksisterende barn' }] },
            }),
        );

        localStorageStore.init(ScenarioType.ingenRegistrerteBarn);

        expect(localStorageStore.getScenario()).toBe(ScenarioType.ingenRegistrerteBarn);
        expect(localStorageStore.get().barn.barn).toEqual([]);
    });

    it('beholder scenario når init får samme scenario som er lagret', () => {
        localStorageStore.setScenario(ScenarioType.default);

        localStorageStore.init(ScenarioType.default);

        expect(localStorageStore.getScenario()).toBe(ScenarioType.default);
        expect(localStorageStore.get().barn.barn).toHaveLength(1);
    });
});
