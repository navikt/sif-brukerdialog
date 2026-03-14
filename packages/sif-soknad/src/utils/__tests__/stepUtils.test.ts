import { describe, expect, it } from 'vitest';

import { StepConfig } from '../../types';
import { getIncludedSteps, getPreviousNextStep } from '../stepUtils';

type StepId = 'start' | 'barn' | 'arbeid' | 'oppsummering' | 'send';

type Søknadsdata = {
    harBarn?: boolean;
    jobber?: boolean;
};

const stepOrder: StepId[] = ['start', 'barn', 'arbeid', 'oppsummering', 'send'];

const baseConfig: StepConfig<StepId, Søknadsdata> = {
    start: { id: 'start', route: '/start' },
    barn: { id: 'barn', route: '/barn', isIncluded: (d) => d.harBarn === true },
    arbeid: { id: 'arbeid', route: '/arbeid', isIncluded: (d) => d.jobber === true },
    oppsummering: { id: 'oppsummering', route: '/oppsummering' },
    send: { id: 'send', route: '/send' },
};

describe('getIncludedSteps', () => {
    it('inkluderer steg når isIncluded er true', () => {
        const result = getIncludedSteps(stepOrder, baseConfig, { harBarn: true });

        expect(result.map((s) => s.stepId)).toContain('barn');
    });

    it('ekskluderer steg når isIncluded er false', () => {
        const result = getIncludedSteps(stepOrder, baseConfig, { harBarn: false });

        expect(result.map((s) => s.stepId)).not.toContain('barn');
    });

    it('inkluderer steg uten isIncluded', () => {
        const result = getIncludedSteps(stepOrder, baseConfig, {});

        expect(result.map((s) => s.stepId)).toEqual(['start', 'oppsummering', 'send']);
    });

    it('beholder rekkefolgen fra stepOrder', () => {
        const result = getIncludedSteps(stepOrder, baseConfig, { harBarn: true, jobber: true });

        expect(result.map((s) => s.stepId)).toEqual(['start', 'barn', 'arbeid', 'oppsummering', 'send']);
    });

    it('oppdateres nar soknadsdata endres (steg kan forsvinne)', () => {
        const before = getIncludedSteps(stepOrder, baseConfig, { harBarn: true, jobber: true });
        const after = getIncludedSteps(stepOrder, baseConfig, { harBarn: false, jobber: true });

        expect(before.map((s) => s.stepId)).toEqual(['start', 'barn', 'arbeid', 'oppsummering', 'send']);
        expect(after.map((s) => s.stepId)).toEqual(['start', 'arbeid', 'oppsummering', 'send']);
    });

    it('handterer flere ekskluderte steg pa rad', () => {
        const result = getIncludedSteps(stepOrder, baseConfig, { harBarn: false, jobber: false });

        expect(result.map((s) => s.stepId)).toEqual(['start', 'oppsummering', 'send']);
    });
});

describe('getPreviousNextStep', () => {
    it('finner riktig next', () => {
        const includedSteps = getIncludedSteps(stepOrder, baseConfig, { harBarn: true, jobber: true });

        expect(getPreviousNextStep(includedSteps, 'barn')).toEqual({
            previousStepId: 'start',
            nextStepId: 'arbeid',
        });
    });

    it('finner riktig previous', () => {
        const includedSteps = getIncludedSteps(stepOrder, baseConfig, { harBarn: true, jobber: true });

        expect(getPreviousNextStep(includedSteps, 'arbeid')).toEqual({
            previousStepId: 'barn',
            nextStepId: 'oppsummering',
        });
    });

    it('hopper over steg som ikke er inkludert', () => {
        const includedSteps = getIncludedSteps(stepOrder, baseConfig, { harBarn: false, jobber: true });

        expect(getPreviousNextStep(includedSteps, 'start')).toEqual({
            previousStepId: null,
            nextStepId: 'arbeid',
        });
    });

    it('forste steg har ikke previous', () => {
        const includedSteps = getIncludedSteps(stepOrder, baseConfig, { harBarn: true, jobber: true });

        expect(getPreviousNextStep(includedSteps, 'start').previousStepId).toBeNull();
    });

    it('siste steg har ikke next', () => {
        const includedSteps = getIncludedSteps(stepOrder, baseConfig, { harBarn: true, jobber: true });

        expect(getPreviousNextStep(includedSteps, 'send').nextStepId).toBeNull();
    });
});
