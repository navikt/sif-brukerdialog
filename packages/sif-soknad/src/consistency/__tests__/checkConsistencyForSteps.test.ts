import { describe, expect, it } from 'vitest';

import { SøknadFormValues, StepSøknadsdata } from '../../types';
import { checkConsistencyForSteps } from '../checkConsistencyForSteps';

type StepId = 'steg1' | 'steg2' | 'steg3' | 'steg4';

const stepOrder: StepId[] = ['steg1', 'steg2', 'steg3', 'steg4'];

const runCheck = ({
    currentStepId,
    formValues,
    søknadsdataByStep,
}: {
    currentStepId: StepId;
    formValues: SøknadFormValues;
    søknadsdataByStep: Partial<Record<StepId, StepSøknadsdata>>;
}) => {
    return checkConsistencyForSteps<StepId>({
        currentStepId,
        stepOrder,
        formValues,
        getSøknadsdataForStep: (stepId) => søknadsdataByStep[stepId],
        formValuesToSøknadsdata: (_stepId, stepFormValues) => stepFormValues,
    });
};

describe('checkConsistencyForSteps', () => {
    it('ingen endring -> alle steg er konsistente', () => {
        const formValues: SøknadFormValues = {
            steg1: { navn: 'Ola' },
            steg2: { jobb: 'Utvikler' },
            steg3: { antallBarn: 2 },
        };

        const result = runCheck({
            currentStepId: 'steg4',
            formValues,
            søknadsdataByStep: {
                steg1: { navn: 'Ola' },
                steg2: { jobb: 'Utvikler' },
                steg3: { antallBarn: 2 },
            },
        });

        expect(result).toBeUndefined();
    });

    it('endring i ett steg -> senere steg blir inkonsistente', () => {
        const result = runCheck({
            currentStepId: 'steg4',
            formValues: {
                steg1: { navn: 'Ola' },
                steg2: { jobb: 'Designer' },
                steg3: { antallBarn: 2 },
            },
            søknadsdataByStep: {
                steg1: { navn: 'Ola' },
                steg2: { jobb: 'Utvikler' },
                steg3: { antallBarn: 2 },
            },
        });

        expect(result).toBe('steg2');
    });

    it('kun relevante steg påvirker resultatet (endring etter current ignoreres)', () => {
        const result = runCheck({
            currentStepId: 'steg3',
            formValues: {
                steg1: { navn: 'Ola' },
                steg2: { jobb: 'Utvikler' },
                steg4: { kommentar: 'endret senere steg' },
            },
            søknadsdataByStep: {
                steg1: { navn: 'Ola' },
                steg2: { jobb: 'Utvikler' },
                steg4: { kommentar: 'gammel verdi' },
            },
        });

        expect(result).toBeUndefined();
    });

    it('sammenligner nested objekter korrekt', () => {
        const result = runCheck({
            currentStepId: 'steg2',
            formValues: {
                steg1: {
                    barn: {
                        navn: 'Kari',
                        info: {
                            fødselsår: 2019,
                            aktiv: true,
                        },
                    },
                },
            },
            søknadsdataByStep: {
                steg1: {
                    barn: {
                        info: {
                            aktiv: true,
                            fødselsår: 2019,
                        },
                        navn: 'Kari',
                    },
                },
            },
        });

        expect(result).toBeUndefined();
    });

    it('sammenligner arrays korrekt', () => {
        const result = runCheck({
            currentStepId: 'steg2',
            formValues: {
                steg1: {
                    arbeidsgivere: ['A', 'B'],
                },
            },
            søknadsdataByStep: {
                steg1: {
                    arbeidsgivere: ['A', 'C'],
                },
            },
        });

        expect(result).toBe('steg1');
    });

    it('sammenligner datoer korrekt', () => {
        const result = checkConsistencyForSteps<StepId>({
            currentStepId: 'steg2',
            stepOrder,
            formValues: {
                steg1: {
                    fom: new Date('2026-03-14T00:00:00.000Z'),
                },
            },
            getSøknadsdataForStep: () => ({
                fom: '2026-03-14T00:00:00.000Z',
            }),
            formValuesToSøknadsdata: (_stepId, stepFormValues) => stepFormValues,
        });

        expect(result).toBeUndefined();
    });

    it('støtter extractor mot domenemodell som ikke er strukturert per steg', () => {
        const domainData = {
            person: { navn: 'Ola' },
            arbeid: { yrke: 'Utvikler' },
        };

        const result = checkConsistencyForSteps<StepId>({
            currentStepId: 'steg3',
            stepOrder,
            formValues: {
                steg1: { navn: 'Ola' },
                steg2: { yrke: 'Designer' },
            },
            getSøknadsdataForStep: (stepId) => {
                switch (stepId) {
                    case 'steg1':
                        return domainData.person;
                    case 'steg2':
                        return domainData.arbeid;
                    default:
                        return undefined;
                }
            },
            formValuesToSøknadsdata: (_stepId, stepFormValues) => stepFormValues,
        });

        expect(result).toBe('steg2');
    });
});
