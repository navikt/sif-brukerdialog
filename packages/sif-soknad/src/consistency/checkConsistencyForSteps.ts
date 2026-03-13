import { SøknadFormValues, StepFormValues, StepSøknadsdata } from '../types';

type FormValuesToSøknadsdataFn = (stepId: string, formValues: StepFormValues) => StepSøknadsdata | undefined;
type GetSøknadsdataForStepFn = (stepId: string) => StepSøknadsdata | undefined;

interface CheckConsistencyForStepsParams {
    currentStepId: string;
    stepOrder: string[];
    formValues: SøknadFormValues;
    getSøknadsdataForStep: GetSøknadsdataForStepFn;
    formValuesToSøknadsdata: FormValuesToSøknadsdataFn;
}

export const checkConsistencyForSteps = ({
    currentStepId,
    stepOrder,
    formValues,
    getSøknadsdataForStep,
    formValuesToSøknadsdata,
}: CheckConsistencyForStepsParams): string | undefined => {
    const currentIndex = stepOrder.indexOf(currentStepId);
    if (currentIndex <= 0) return undefined;

    const precedingSteps = stepOrder.slice(0, currentIndex);

    for (const stepId of precedingSteps) {
        const stepFormValues = formValues[stepId];
        if (!stepFormValues) continue;

        const søknadsdata = getSøknadsdataForStep(stepId);
        const converted = formValuesToSøknadsdata(stepId, stepFormValues);

        if (!søknadsdata || JSON.stringify(converted) !== JSON.stringify(søknadsdata)) {
            return stepId;
        }
    }

    return undefined;
};
