import { useMemo } from 'react';

import { StepFormValues, StepSøknadsdata } from '../types';
import { useSøknadFormValues } from '.';

type FormValuesToSøknadsdataFn = (stepId: string, formValues: StepFormValues) => StepSøknadsdata | undefined;

type GetSøknadsdataForStepFn = (stepId: string) => StepSøknadsdata | undefined;

interface Props {
    currentStepId: string;
    stepOrder: string[];
    getSøknadsdataForStep: GetSøknadsdataForStepFn;
    formValuesToSøknadsdata: FormValuesToSøknadsdataFn;
}

/**
 * Sjekker om skjemadata for et steg er konsistent med lagrede søknadsdata. Fanger
 * opp om skjemadata har endret seg uten at dette er commitet til store. F.eks. hvis
 * bruker går frem og tilbake uten å bruke submit.
 */
export const useCheckSøknadStepData = ({
    currentStepId,
    stepOrder,
    getSøknadsdataForStep,
    formValuesToSøknadsdata,
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

            if (!søknadsdata || JSON.stringify(converted) !== JSON.stringify(søknadsdata)) {
                return stepId;
            }
        }
        return null;
    }, [currentStepId, stepOrder, stepsFormValues, getSøknadsdataForStep, formValuesToSøknadsdata]);
};
