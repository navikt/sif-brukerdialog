import { useMemo } from 'react';

import { useStepFormValues } from '../state';

type FormValuesToSøknadsdataFn = (
    stepId: string,
    formValues: Record<string, unknown>,
) => Record<string, unknown> | undefined;

type GetSøknadsdataForStepFn = (stepId: string) => Record<string, unknown> | undefined;

interface UseStepConsistencyCheckerProps {
    currentStepId: string;
    stepOrder: string[];
    getSøknadsdataForStep: GetSøknadsdataForStepFn;
    formValuesToSøknadsdata: FormValuesToSøknadsdataFn;
    isEqual?: (a: unknown, b: unknown) => boolean;
}

const defaultIsEqual = (a: unknown, b: unknown): boolean => JSON.stringify(a) === JSON.stringify(b);

export const useStepConsistencyChecker = ({
    currentStepId,
    stepOrder,
    getSøknadsdataForStep,
    formValuesToSøknadsdata,
    isEqual = defaultIsEqual,
}: UseStepConsistencyCheckerProps): string | null => {
    const { stepFormValues } = useStepFormValues();

    return useMemo(() => {
        const currentIndex = stepOrder.indexOf(currentStepId);
        if (currentIndex <= 0) return null;

        const precedingSteps = stepOrder.slice(0, currentIndex);

        for (const stepId of precedingSteps) {
            const formValues = stepFormValues[stepId];
            if (!formValues) continue;

            const søknadsdata = getSøknadsdataForStep(stepId);
            const converted = formValuesToSøknadsdata(stepId, formValues);

            if (!søknadsdata || !isEqual(converted, søknadsdata)) {
                return stepId;
            }
        }
        return null;
    }, [currentStepId, stepOrder, stepFormValues, getSøknadsdataForStep, formValuesToSøknadsdata, isEqual]);
};
