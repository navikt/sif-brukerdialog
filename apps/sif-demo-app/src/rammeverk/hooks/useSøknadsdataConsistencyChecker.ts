import { useMemo } from 'react';

import { useSøknadFormValues } from '../state';
import { StepFormValues } from '../state/SøknadFormValuesContext';
import { StepSøknadsdata } from '../types';

type FormValuesToSøknadsdataFn = (stepId: string, formValues: StepFormValues) => StepSøknadsdata | undefined;

type GetSøknadsdataForStepFn = (stepId: string) => StepSøknadsdata | undefined;

interface Props {
    currentStepId: string;
    stepOrder: string[];
    getSøknadsdataForStep: GetSøknadsdataForStepFn;
    formValuesToSøknadsdata: FormValuesToSøknadsdataFn;
    isEqual?: (a: unknown, b: unknown) => boolean;
}

const defaultIsEqual = (a: unknown, b: unknown): boolean => JSON.stringify(a) === JSON.stringify(b);

export const useSøknadsdataConsistencyChecker = ({
    currentStepId,
    stepOrder,
    getSøknadsdataForStep,
    formValuesToSøknadsdata,
    isEqual = defaultIsEqual,
}: Props): string | null => {
    const { søknadFormValues: stepsFormValues } = useSøknadFormValues();

    return useMemo(() => {
        const currentIndex = stepOrder.indexOf(currentStepId);
        if (currentIndex <= 0) return null;

        const precedingSteps = stepOrder.slice(0, currentIndex);

        for (const stepId of precedingSteps) {
            const formValues = stepsFormValues[stepId];
            if (!formValues) continue;

            const søknadsdata = getSøknadsdataForStep(stepId);
            const converted = formValuesToSøknadsdata(stepId, formValues);

            if (!søknadsdata || !isEqual(converted, søknadsdata)) {
                return stepId;
            }
        }
        return null;
    }, [currentStepId, stepOrder, stepsFormValues, getSøknadsdataForStep, formValuesToSøknadsdata, isEqual]);
};
