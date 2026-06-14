import { describe, expect, it } from 'vitest';

import { StepDefinition } from '../../types';
import { createSøknadAppStore } from '../createSøknadAppStore';

const stepOrder = ['start', 'barn', 'arbeid', 'oppsummering'];

const config: Record<string, StepDefinition> = {
    start: { route: 'start', isCompleted: (d) => d['start'] !== undefined },
    barn: {
        route: 'barn',
        isIncluded: (d) => d['start'] !== undefined && (d['start'] as Record<string, unknown>)['harBarn'] === true,
        isCompleted: (d) => d['barn'] !== undefined,
    },
    arbeid: {
        route: 'arbeid',
        isIncluded: (d) => d['start'] !== undefined && (d['start'] as Record<string, unknown>)['jobber'] === true,
        isCompleted: (d) => d['arbeid'] !== undefined,
    },
    oppsummering: { route: 'oppsummering', isCompleted: (d) => d['oppsummering'] !== undefined },
};

const createStore = () => createSøknadAppStore({ config, stepOrder });

describe('createSøknadAppStore — init', () => {
    it('initialiserer tom tilstand når mellomlagring er null', () => {
        const store = createStore();
        store.getState().init(null);
        const state = store.getState();

        expect(state.isInitialized).toBe(true);
        expect(state.søknadsdata).toEqual({});
        expect(state.resumeStepId).toBeUndefined();
        expect(state.includedSteps.map((s) => s.stepId)).toEqual(['start', 'oppsummering']);
    });

    it('gjenoppretter tilstand fra mellomlagret blob', () => {
        const store = createStore();
        store.getState().init({
            versjon: 1,
            resumeStepId: 'arbeid',
            søknadsdata: { start: { jobber: true } },
        });
        const state = store.getState();

        expect(state.resumeStepId).toBe('arbeid');
        expect(state.søknadsdata).toEqual({ start: { jobber: true } });
        expect(state.includedSteps.map((s) => s.stepId)).toEqual(['start', 'arbeid', 'oppsummering']);
    });

    it('gjenoppretter draftFormValues fra blob', () => {
        const store = createStore();
        store.getState().init({
            versjon: 1,
            resumeStepId: 'start',
            søknadsdata: {},
            draftFormValues: { start: { harBarn: true } },
        });

        expect(store.getState().draftFormValues).toEqual({ start: { harBarn: true } });
    });
});

describe('createSøknadAppStore — commitState', () => {
    it('oppdaterer søknadsdata og setter resumeStepId til neste steg', () => {
        const store = createStore();
        store.getState().init(null);

        const { newResumeStepId } = store.getState().commitState('start', { harBarn: false });

        expect(store.getState().søknadsdata['start']).toEqual({ harBarn: false });
        expect(newResumeStepId).toBe('oppsummering');
        expect(store.getState().resumeStepId).toBe('oppsummering');
    });

    it('inkluderer betingede steg etter commit', () => {
        const store = createStore();
        store.getState().init(null);

        store.getState().commitState('start', { harBarn: true, jobber: true });

        expect(store.getState().includedSteps.map((s) => s.stepId)).toEqual([
            'start',
            'barn',
            'arbeid',
            'oppsummering',
        ]);
    });

    it('ekskluderer betingede steg og sletter data når de faller ut', () => {
        const store = createStore();
        store.getState().init({
            versjon: 1,
            resumeStepId: 'oppsummering',
            søknadsdata: { start: { harBarn: true }, barn: { navn: 'Kari' } },
        });

        store.getState().commitState('start', { harBarn: false });

        const state = store.getState();
        expect(state.includedSteps.map((s) => s.stepId)).not.toContain('barn');
        expect(state.søknadsdata['barn']).toBeUndefined();
    });

    it('returnerer newRoute tilsvarende neste stegs route', () => {
        const store = createStore();
        store.getState().init(null);

        const { newRoute } = store.getState().commitState('start', { harBarn: true });

        expect(newRoute).toBe('barn');
    });

    it('returnerer undefined resumeStepId og route fra siste steg', () => {
        const store = createStore();
        store.getState().init({
            versjon: 1,
            resumeStepId: 'oppsummering',
            søknadsdata: {
                start: { harBarn: false },
                arbeid: { timervPerUke: 37 },
                oppsummering: {},
            },
        });

        const { newResumeStepId, newRoute } = store.getState().commitState('oppsummering', {});

        expect(newResumeStepId).toBeUndefined();
        expect(newRoute).toBeUndefined();
    });
});

describe('createSøknadAppStore — clearDraftFormValues', () => {
    it('fjerner draft-verdier for angitt steg', () => {
        const store = createStore();
        store.getState().init({
            versjon: 1,
            resumeStepId: 'start',
            søknadsdata: {},
            draftFormValues: { start: { harBarn: true }, barn: { navn: 'Kari' } },
        });

        store.getState().clearDraftFormValues('start');

        expect(store.getState().draftFormValues['start']).toBeUndefined();
        expect(store.getState().draftFormValues['barn']).toEqual({ navn: 'Kari' });
    });
});

describe('createSøknadAppStore — setSøknadSendt og reset', () => {
    it('setSøknadSendt markerer søknad som sendt og nullstiller draft og resumeStepId', () => {
        const store = createStore();
        store.getState().init({
            versjon: 1,
            resumeStepId: 'oppsummering',
            søknadsdata: { start: { harBarn: true } },
        });

        store.getState().setSøknadSendt();

        const state = store.getState();
        expect(state.søknadSendt).toBe(true);
        expect(state.resumeStepId).toBeUndefined();
        expect(state.draftFormValues).toEqual({});
    });

    it('reset tømmer alt og setter isInitialized til true', () => {
        const store = createStore();
        store.getState().init({
            versjon: 1,
            resumeStepId: 'barn',
            søknadsdata: { start: { harBarn: true } },
        });

        store.getState().reset();

        const state = store.getState();
        expect(state.isInitialized).toBe(true);
        expect(state.søknadsdata).toEqual({});
        expect(state.resumeStepId).toBeUndefined();
        expect(state.søknadSendt).toBe(false);
    });
});
