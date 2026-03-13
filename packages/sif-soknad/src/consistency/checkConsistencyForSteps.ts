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

const normalizeForComparison = (value: unknown): unknown => {
    if (value === null || value === undefined) {
        return undefined;
    }

    if (value instanceof Date) {
        return value.toISOString();
    }

    if (Array.isArray(value)) {
        return value.map((item) => normalizeForComparison(item));
    }

    if (typeof value === 'object') {
        const entries = Object.entries(value as Record<string, unknown>)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([key, val]) => [key, normalizeForComparison(val)] as const)
            .filter(([, val]) => val !== undefined);

        return Object.fromEntries(entries);
    }

    return value;
};

const isEqualNormalized = (a: unknown, b: unknown): boolean => {
    return JSON.stringify(normalizeForComparison(a)) === JSON.stringify(normalizeForComparison(b));
};

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

        if (!søknadsdata || !isEqualNormalized(converted, søknadsdata)) {
            return stepId;
        }
    }

    return undefined;
};
