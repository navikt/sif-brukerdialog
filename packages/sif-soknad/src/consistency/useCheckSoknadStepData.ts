import { useMemo } from 'react';

import { StepFormValues, StepSøknadsdata } from '../types';
import { useSøknadFormValues } from '.';
import { checkConsistencyForSteps } from './checkConsistencyForSteps';

type FormValuesToSøknadsdataFn<TStepId extends string> = (
    stepId: TStepId,
    formValues: StepFormValues,
) => StepSøknadsdata | undefined;

type GetSøknadsdataForStepFn<TStepId extends string> = (stepId: TStepId) => StepSøknadsdata | undefined;

interface Props<TStepId extends string> {
    currentStepId: TStepId;
    stepOrder: TStepId[];
    getSøknadsdataForStep: GetSøknadsdataForStepFn<TStepId>;
    formValuesToSøknadsdata: FormValuesToSøknadsdataFn<TStepId>;
}

/**
 * Sjekker om skjemadata for et steg er konsistent med lagrede søknadsdata. Fanger
 * opp om skjemadata har endret seg uten at dette er commitet til store. F.eks. hvis
 * bruker går frem og tilbake uten å bruke submit.
 */
export const useCheckSøknadStepData = <StepId extends string>({
    currentStepId,
    stepOrder,
    getSøknadsdataForStep,
    formValuesToSøknadsdata,
}: Props<StepId>): StepId | undefined => {
    const { søknadFormValues: stepsFormValues } = useSøknadFormValues();

    return useMemo(() => {
        return checkConsistencyForSteps({
            currentStepId,
            stepOrder,
            formValues: stepsFormValues,
            getSøknadsdataForStep,
            formValuesToSøknadsdata,
        });
    }, [currentStepId, stepOrder, stepsFormValues, getSøknadsdataForStep, formValuesToSøknadsdata]);
};
