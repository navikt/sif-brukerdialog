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
    start: { route: '/start' },
    barn: { route: '/barn', isIncluded: (d) => d.harBarn === true },
    arbeid: { route: '/arbeid', isIncluded: (d) => d.jobber === true },
    oppsummering: { route: '/oppsummering' },
    send: { route: '/send' },
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

    it('beholder rekkefølgen fra stepOrder', () => {
        const result = getIncludedSteps(stepOrder, baseConfig, { harBarn: true, jobber: true });

        expect(result.map((s) => s.stepId)).toEqual(['start', 'barn', 'arbeid', 'oppsummering', 'send']);
    });

    it('oppdateres når søknadsdata endres (steg kan forsvinne)', () => {
        const before = getIncludedSteps(stepOrder, baseConfig, { harBarn: true, jobber: true });
        const after = getIncludedSteps(stepOrder, baseConfig, { harBarn: false, jobber: true });

        expect(before.map((s) => s.stepId)).toEqual(['start', 'barn', 'arbeid', 'oppsummering', 'send']);
        expect(after.map((s) => s.stepId)).toEqual(['start', 'arbeid', 'oppsummering', 'send']);
    });

    it('håndterer flere ekskluderte steg på rad', () => {
        const result = getIncludedSteps(stepOrder, baseConfig, { harBarn: false, jobber: false });

        expect(result.map((s) => s.stepId)).toEqual(['start', 'oppsummering', 'send']);
    });

    it('kaster tydelig feil når stepOrder inneholder stepId som mangler i config', () => {
        const invalidStepOrder: StepId[] = [...stepOrder, 'mangler' as StepId];

        expect(() => getIncludedSteps(invalidStepOrder, baseConfig, {})).toThrow(
            "getIncludedSteps: stepOrder inneholder ukjent stepId 'mangler'",
        );
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

    it('første steg har ikke previous', () => {
        const includedSteps = getIncludedSteps(stepOrder, baseConfig, { harBarn: true, jobber: true });

        expect(getPreviousNextStep(includedSteps, 'start').previousStepId).toBeNull();
    });

    it('siste steg har ikke next', () => {
        const includedSteps = getIncludedSteps(stepOrder, baseConfig, { harBarn: true, jobber: true });

        expect(getPreviousNextStep(includedSteps, 'send').nextStepId).toBeNull();
    });
});
