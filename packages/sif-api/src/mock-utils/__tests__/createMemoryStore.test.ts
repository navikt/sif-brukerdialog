import { beforeEach, describe, expect, it } from 'vitest';

import { createMemoryStore } from '../createMemoryStore';

enum Scenario {
    default = 'default',
    other = 'other',
}

type Data = { value: string };

const getScenarioData = (scenario: Scenario): Data => ({ value: `${scenario}-data` });

let store: ReturnType<typeof createMemoryStore<Data, Scenario>>;

beforeEach(() => {
    store = createMemoryStore<Data, Scenario>({
        getScenarioData,
        scenarioValues: Object.values(Scenario),
        defaultScenario: Scenario.default,
    });
});

describe('createMemoryStore — init', () => {
    it('setter scenario og laster data', () => {
        store.init(Scenario.other);
        expect(store.getScenario()).toBe(Scenario.other);
        expect(store.get()).toEqual({ value: 'other-data' });
    });

    it('init med defaultScenario gir default data', () => {
        store.init(Scenario.default);
        expect(store.getScenario()).toBe(Scenario.default);
        expect(store.get()).toEqual({ value: 'default-data' });
    });
});

describe('createMemoryStore — setScenario og getScenario', () => {
    it('bytter scenario og oppdaterer data', () => {
        store.init(Scenario.default);
        store.setScenario(Scenario.other);
        expect(store.getScenario()).toBe(Scenario.other);
        expect(store.get()).toEqual({ value: 'other-data' });
    });
});

describe('createMemoryStore — set og update', () => {
    it('set() overskriver data', () => {
        store.init(Scenario.default);
        store.set({ value: 'custom' });
        expect(store.get()).toEqual({ value: 'custom' });
    });

    it('update() merger partial inn i eksisterende data', () => {
        store.init(Scenario.default);
        store.update({ value: 'oppdatert' });
        expect(store.get()).toEqual({ value: 'oppdatert' });
    });
});

describe('createMemoryStore — reset', () => {
    it('nullstiller data til gjeldende scenarios originaldata', () => {
        store.init(Scenario.other);
        store.set({ value: 'endret' });
        store.reset();
        expect(store.get()).toEqual({ value: 'other-data' });
        expect(store.getScenario()).toBe(Scenario.other);
    });

    it('reset() kaster feil dersom store ikke er initialisert', () => {
        expect(() => store.reset()).toThrow();
    });
});
