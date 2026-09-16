import { describe, expect, it } from 'vitest';

import { StepDefinition } from '../../types';
import { getIncludedSteps, getPreviousNextStep } from '../stepUtils';

const stepOrder = ['start', 'barn', 'arbeid', 'oppsummering'];

const config: Record<string, StepDefinition> = {
    start: { route: 'start' },
    barn: { route: 'barn', isIncluded: (d) => d['harBarn'] === true },
    arbeid: { route: 'arbeid', isIncluded: (d) => d['jobber'] === true },
    oppsummering: { route: 'oppsummering', isCompleted: (d) => d['oppsummeringOk'] === true },
};

describe('getIncludedSteps', () => {
    it('inkluderer steg uten isIncluded alltid', () => {
        const result = getIncludedSteps(stepOrder, config, {});
        expect(result.map((s) => s.stepId)).toEqual(['start', 'oppsummering']);
    });

    it('inkluderer steg når isIncluded returnerer true', () => {
        const result = getIncludedSteps(stepOrder, config, { harBarn: true });
        expect(result.map((s) => s.stepId)).toContain('barn');
    });

    it('ekskluderer steg når isIncluded returnerer false', () => {
        const result = getIncludedSteps(stepOrder, config, { harBarn: false });
        expect(result.map((s) => s.stepId)).not.toContain('barn');
    });

    it('beregner completed via isCompleted', () => {
        const result = getIncludedSteps(stepOrder, config, { oppsummeringOk: true });
        expect(result.find((s) => s.stepId === 'oppsummering')?.completed).toBe(true);
    });

    it('completed er false når isCompleted mangler', () => {
        const result = getIncludedSteps(stepOrder, config, {});
        expect(result.find((s) => s.stepId === 'start')?.completed).toBe(false);
    });

    it('kaster feil når stepOrder inneholder ukjent stepId', () => {
        expect(() => getIncludedSteps([...stepOrder, 'ukjent'], config, {})).toThrow(
            "getIncludedSteps: stepOrder inneholder ukjent stepId 'ukjent'",
        );
    });
});

describe('getPreviousNextStep', () => {
    it('returnerer riktig previous og next for midtsteg', () => {
        const steps = getIncludedSteps(stepOrder, config, { harBarn: true, jobber: true });
        expect(getPreviousNextStep(steps, 'barn')).toEqual({ previousStepId: 'start', nextStepId: 'arbeid' });
    });

    it('hopper over ekskluderte steg', () => {
        const steps = getIncludedSteps(stepOrder, config, { harBarn: false, jobber: true });
        expect(getPreviousNextStep(steps, 'arbeid').previousStepId).toBe('start');
    });

    it('første steg har ikke previous, siste steg har ikke next', () => {
        const steps = getIncludedSteps(stepOrder, config, {});
        expect(getPreviousNextStep(steps, 'start').previousStepId).toBeNull();
        expect(getPreviousNextStep(steps, 'oppsummering').nextStepId).toBeNull();
    });

    it('returnerer null for begge når currentStepId ikke er inkludert', () => {
        const steps = getIncludedSteps(stepOrder, config, {});
        expect(getPreviousNextStep(steps, 'barn')).toEqual({ previousStepId: null, nextStepId: null });
    });
});
