import { useMemo } from 'react';

import { StepFormValues, StepSøknadsdata } from '../types';
import { checkConsistencyForSteps } from './checkConsistencyForSteps';
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
export const useCheckSøknadStepData = <StepId>({
    currentStepId,
    stepOrder,
    getSøknadsdataForStep,
    formValuesToSøknadsdata,
}: Props): StepId | undefined => {
    const { søknadFormValues: stepsFormValues } = useSøknadFormValues();

    return useMemo(() => {
        return checkConsistencyForSteps({
            currentStepId,
            stepOrder,
            formValues: stepsFormValues,
            getSøknadsdataForStep,
            formValuesToSøknadsdata,
        }) as StepId | undefined;
    }, [currentStepId, stepOrder, stepsFormValues, getSøknadsdataForStep, formValuesToSøknadsdata]);
};
