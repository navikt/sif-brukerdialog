import { beforeEach, describe, expect, it } from 'vitest';

import { createLocalStorageStore } from '../createLocalStorageStore';

enum Scenario {
    default = 'default',
    other = 'other',
}

type Data = { value: string };

const getScenarioData = (scenario: Scenario): Data => ({ value: `${scenario}-data` });

const makeStore = () =>
    createLocalStorageStore<Data, Scenario>({
        storageKey: 'TEST_DATA',
        scenarioKey: 'TEST_SCENARIO',
        getScenarioData,
        scenarioValues: Object.values(Scenario),
        defaultScenario: Scenario.default,
    });

beforeEach(() => {
    localStorage.clear();
});

describe('createLocalStorageStore — init', () => {
    it('setter init-scenario når ingenting er lagret', () => {
        const store = makeStore();
        store.init(Scenario.other);
        expect(store.getScenario()).toBe(Scenario.other);
        expect(store.get()).toEqual({ value: 'other-data' });
    });

    it('beholder lagret scenario og data ved reload (init med annet scenario enn lagret)', () => {
        const store = makeStore();
        store.setScenario(Scenario.other);
        store.set({ value: 'tilpasset' });
        store.init(Scenario.default);
        expect(store.getScenario()).toBe(Scenario.other);
        expect(store.get()).toEqual({ value: 'tilpasset' });
    });

    it('setter init-scenario når lagret scenario er ugyldig', () => {
        localStorage.setItem('TEST_SCENARIO', 'korrupt_verdi');
        const store = makeStore();
        store.init(Scenario.default);
        expect(store.getScenario()).toBe(Scenario.default);
    });
});

describe('createLocalStorageStore — getScenario', () => {
    it('returnerer lagret gyldig scenario', () => {
        const store = makeStore();
        store.setScenario(Scenario.other);
        expect(store.getScenario()).toBe(Scenario.other);
    });

    it('returnerer defaultScenario når ingenting er lagret', () => {
        const store = makeStore();
        expect(store.getScenario()).toBe(Scenario.default);
    });

    it('returnerer defaultScenario når lagret verdi er ugyldig', () => {
        localStorage.setItem('TEST_SCENARIO', 'ugyldig');
        const store = makeStore();
        expect(store.getScenario()).toBe(Scenario.default);
    });
});

describe('createLocalStorageStore — get', () => {
    it('returnerer lagret data', () => {
        const store = makeStore();
        store.setScenario(Scenario.other);
        expect(store.get()).toEqual({ value: 'other-data' });
    });

    it('returnerer default scenariodata når ingenting er lagret', () => {
        const store = makeStore();
        expect(store.get()).toEqual({ value: 'default-data' });
    });
});

describe('createLocalStorageStore — set og update', () => {
    it('set() overskriver data', () => {
        const store = makeStore();
        store.setScenario(Scenario.default);
        store.set({ value: 'custom' });
        expect(store.get()).toEqual({ value: 'custom' });
    });

    it('update() merger partial inn i eksisterende data', () => {
        const store = makeStore();
        store.setScenario(Scenario.default);
        store.update({ value: 'oppdatert' });
        expect(store.get()).toEqual({ value: 'oppdatert' });
    });
});

describe('createLocalStorageStore — reset', () => {
    it('nullstiller data til gjeldende scenarios originaldata', () => {
        const store = makeStore();
        store.setScenario(Scenario.other);
        store.set({ value: 'endret' });
        store.reset();
        expect(store.get()).toEqual({ value: 'other-data' });
        expect(store.getScenario()).toBe(Scenario.other);
    });

    it('bruker defaultScenario ved reset når lagret scenarioverdi er korrupt', () => {
        const store = makeStore();
        store.setScenario(Scenario.other);
        localStorage.setItem('TEST_SCENARIO', 'korrupt_verdi');
        store.reset();
        expect(store.getScenario()).toBe(Scenario.default);
        expect(store.get()).toEqual({ value: 'default-data' });
    });

    it('bruker defaultScenario ved reset når ingen scenarioverdi er lagret', () => {
        const store = makeStore();
        store.setScenario(Scenario.other);
        localStorage.removeItem('TEST_SCENARIO');
        store.reset();
        expect(store.getScenario()).toBe(Scenario.default);
        expect(store.get()).toEqual({ value: 'default-data' });
    });
});
