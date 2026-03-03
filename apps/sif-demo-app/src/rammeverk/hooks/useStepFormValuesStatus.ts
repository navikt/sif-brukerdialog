import { useState, useEffect } from 'react';
import { useStepFormValues } from '../state/StepFormValuesContext';

type FormValuesToSøknadsdataFn = (
    stepId: string,
    formValues: Record<string, unknown>,
) => Record<string, unknown> | undefined;

type GetSøknadsdataForStepFn = (stepId: string) => Record<string, unknown> | undefined;

interface UseStepFormValuesStatusOptions {
    currentStepId: string;
    stepOrder: string[];
    formValuesToSøknadsdata: FormValuesToSøknadsdataFn;
    getSøknadsdataForStep: GetSøknadsdataForStepFn;
    isEqual?: (a: unknown, b: unknown) => boolean;
}

const defaultIsEqual = (a: unknown, b: unknown): boolean => {
    return JSON.stringify(a) === JSON.stringify(b);
};

/**
 * Hook som sjekker om formValues for tidligere steg matcher lagret søknadsdata.
 * Brukes for å oppdage om bruker har endret data uten å submitte.
 *
 * @returns invalidSteps - Liste over stegId-er hvor formValues ikke matcher søknadsdata
 */
export const useStepFormValuesStatus = ({
    currentStepId,
    stepOrder,
    formValuesToSøknadsdata,
    getSøknadsdataForStep,
    isEqual = defaultIsEqual,
}: UseStepFormValuesStatusOptions) => {
    const [invalidSteps, setInvalidSteps] = useState<string[]>([]);
    const { stepFormValues } = useStepFormValues();

    useEffect(() => {
        const currentIndex = stepOrder.indexOf(currentStepId);
        if (currentIndex <= 0) {
            setInvalidSteps([]);
            return;
        }

        const precedingSteps = stepOrder.slice(0, currentIndex);
        const invalid: string[] = [];

        precedingSteps.forEach((stepId) => {
            const formValues = stepFormValues[stepId];
            if (!formValues) {
                return;
            }

            const søknadsdata = getSøknadsdataForStep(stepId);
            const convertedFormValues = formValuesToSøknadsdata(stepId, formValues);

            if (!søknadsdata || !isEqual(convertedFormValues, søknadsdata)) {
                invalid.push(stepId);
            }
        });

        setInvalidSteps(invalid);
    }, [currentStepId, stepOrder, stepFormValues, formValuesToSøknadsdata, getSøknadsdataForStep, isEqual]);

    return {
        invalidSteps,
        hasInvalidSteps: invalidSteps.length > 0,
        firstInvalidStep: invalidSteps[0] ?? null,
    };
};
