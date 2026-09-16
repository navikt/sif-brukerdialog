import { describe, expect, it } from 'vitest';

import { StepFormValuesMap } from '../../consistency/SøknadStepFormContext';
import { checkConsistencyForSteps } from '../checkConsistencyForSteps';

const stepOrder = ['steg1', 'steg2', 'steg3', 'steg4'];

const runCheck = ({
    currentStepId,
    formValues,
    søknadsdataByStep,
}: {
    currentStepId: string;
    formValues: StepFormValuesMap;
    søknadsdataByStep: Record<string, Record<string, unknown>>;
}) =>
    checkConsistencyForSteps({
        currentStepId,
        stepOrder,
        formValues,
        getSøknadsdataForStep: (stepId) => søknadsdataByStep[stepId],
        formValuesToSøknadsdata: (_stepId, stepFormValues) => stepFormValues,
    });

describe('checkConsistencyForSteps', () => {
    it('returnerer undefined når alle foregående steg er konsistente', () => {
        expect(
            runCheck({
                currentStepId: 'steg4',
                formValues: { steg1: { navn: 'Ola' }, steg2: { jobb: 'Utvikler' } },
                søknadsdataByStep: { steg1: { navn: 'Ola' }, steg2: { jobb: 'Utvikler' } },
            }),
        ).toBeUndefined();
    });

    it('returnerer stepId for første steg med ulagret endring', () => {
        expect(
            runCheck({
                currentStepId: 'steg4',
                formValues: { steg1: { navn: 'Ola' }, steg2: { jobb: 'Designer' } },
                søknadsdataByStep: { steg1: { navn: 'Ola' }, steg2: { jobb: 'Utvikler' } },
            }),
        ).toBe('steg2');
    });

    it('ignorerer endringer i steg etter currentStepId', () => {
        expect(
            runCheck({
                currentStepId: 'steg3',
                formValues: { steg1: { navn: 'Ola' }, steg4: { kommentar: 'endret' } },
                søknadsdataByStep: { steg1: { navn: 'Ola' }, steg4: { kommentar: 'gammel' } },
            }),
        ).toBeUndefined();
    });

    it('returnerer undefined for første steg (ingen foregående)', () => {
        expect(
            runCheck({
                currentStepId: 'steg1',
                formValues: { steg1: { navn: 'Endret' } },
                søknadsdataByStep: { steg1: { navn: 'Original' } },
            }),
        ).toBeUndefined();
    });

    it('sammenligner nested objekter korrekt (nøkkelrekkefølge ignoreres)', () => {
        expect(
            runCheck({
                currentStepId: 'steg2',
                formValues: { steg1: { barn: { info: { aktiv: true, fødselsår: 2019 }, navn: 'Kari' } } },
                søknadsdataByStep: { steg1: { barn: { navn: 'Kari', info: { fødselsår: 2019, aktiv: true } } } },
            }),
        ).toBeUndefined();
    });

    it('oppdager ulikhet i arrays', () => {
        expect(
            runCheck({
                currentStepId: 'steg2',
                formValues: { steg1: { arbeidsgivere: ['A', 'B'] } },
                søknadsdataByStep: { steg1: { arbeidsgivere: ['A', 'C'] } },
            }),
        ).toBe('steg1');
    });

    it('sammenligner Date mot ISO-streng korrekt', () => {
        expect(
            checkConsistencyForSteps({
                currentStepId: 'steg2',
                stepOrder,
                formValues: { steg1: { fom: new Date('2026-03-14T00:00:00.000Z') } },
                getSøknadsdataForStep: () => ({ fom: '2026-03-14T00:00:00.000Z' }),
                formValuesToSøknadsdata: (_stepId, v) => v,
            }),
        ).toBeUndefined();
    });
});
