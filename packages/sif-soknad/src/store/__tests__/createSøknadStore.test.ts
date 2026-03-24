import { describe, expect, it } from 'vitest';

import { StepConfig } from '../../types';
import { createSøknadStore } from '../createSøknadStore';

type StepId = 'start' | 'barn' | 'arbeid' | 'oppsummering';

type Søknadsdata = {
    harForståttRettigheterOgPlikter?: boolean;
    harBarn?: boolean;
    jobber?: boolean;
};

type TestState = {
    søknadsdata: Søknadsdata;
    locale: 'nb';
};

const stepOrder: StepId[] = ['start', 'barn', 'arbeid', 'oppsummering'];

const stepConfig: StepConfig<StepId, Søknadsdata> = {
    start: { route: '/start' },
    barn: { route: '/barn', isIncluded: (d) => d.harBarn === true },
    arbeid: { route: '/arbeid', isIncluded: (d) => d.jobber === true },
    oppsummering: { route: '/oppsummering' },
};

const createStore = () =>
    createSøknadStore<TestState, Søknadsdata, StepId>({
        stepOrder,
        stepConfig,
    });

describe('createSøknadStore', () => {
    it('init setter state og beregner includedSteps fra mellomlagret data', () => {
        const store = createStore();

        store.getState().init({ locale: 'nb' }, { harBarn: true, jobber: false }, 'start');

        const state = store.getState();
        expect(state.currentStepId).toBe('start');
        expect(state.søknadSendt).toBe(false);
        expect(state.søknadState?.locale).toBe('nb');
        expect(state.søknadState?.søknadsdata).toEqual({ harBarn: true, jobber: false });
        expect(state.includedSteps.map((s) => s.stepId)).toEqual(['start', 'barn', 'oppsummering']);
    });

    it('setSøknadsdata slår sammen data og rekalkulerer dynamiske steg', () => {
        const store = createStore();
        store.getState().init({ locale: 'nb' }, { harBarn: false, jobber: false }, 'start');

        store.getState().setSøknadsdata({ harBarn: true, jobber: true });

        const state = store.getState();
        expect(state.søknadState?.søknadsdata).toEqual({ harBarn: true, jobber: true });
        expect(state.includedSteps.map((s) => s.stepId)).toEqual(['start', 'barn', 'arbeid', 'oppsummering']);
    });

    it('startSøknad setter første steg og harForståttRettigheterOgPlikter', () => {
        const store = createStore();
        store.getState().init({ locale: 'nb' }, { harBarn: true, jobber: true }, 'start');

        store.getState().startSøknad('start', true);

        const state = store.getState();
        expect(state.currentStepId).toBe('start');
        expect(state.søknadSendt).toBe(false);
        expect(state.søknadState?.søknadsdata).toEqual({ harForståttRettigheterOgPlikter: true });
        expect(state.includedSteps.map((s) => s.stepId)).toEqual(['start', 'oppsummering']);
    });

    it('resetSøknad nullstiller søknadsdata og beholder øvrig state', () => {
        const store = createStore();
        store.getState().init({ locale: 'nb' }, { harBarn: true, jobber: true }, 'arbeid');

        store.getState().resetSøknad();

        const state = store.getState();
        expect(state.currentStepId).toBeUndefined();
        expect(state.søknadSendt).toBe(false);
        expect(state.søknadState?.locale).toBe('nb');
        expect(state.søknadState?.søknadsdata).toEqual({});
        expect(state.includedSteps.map((s) => s.stepId)).toEqual(['start', 'oppsummering']);
    });

    it('setSøknadSendt markerer sendt og tømmer includedSteps', () => {
        const store = createStore();
        store.getState().init({ locale: 'nb' }, { harBarn: true, jobber: true }, 'oppsummering');

        store.getState().setSøknadSendt();

        const state = store.getState();
        expect(state.currentStepId).toBeUndefined();
        expect(state.søknadSendt).toBe(true);
        expect(state.søknadState?.søknadsdata).toEqual({});
        expect(state.includedSteps).toEqual([]);
    });
});
