import { SøknadFormValues, StepFormValues, StepSøknadsdata } from '../types';

type FormValuesToSøknadsdataFn<TStepId extends string> = (
    stepId: TStepId,
    formValues: StepFormValues,
) => StepSøknadsdata | undefined;
type GetSøknadsdataForStepFn<TStepId extends string> = (stepId: TStepId) => StepSøknadsdata | undefined;

interface CheckConsistencyForStepsParams<TStepId extends string> {
    currentStepId: TStepId;
    stepOrder: TStepId[];
    formValues: SøknadFormValues;
    getSøknadsdataForStep: GetSøknadsdataForStepFn<TStepId>;
    formValuesToSøknadsdata: FormValuesToSøknadsdataFn<TStepId>;
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

export const checkConsistencyForSteps = <TStepId extends string>({
    currentStepId,
    stepOrder,
    formValues,
    getSøknadsdataForStep,
    formValuesToSøknadsdata,
}: CheckConsistencyForStepsParams<TStepId>): TStepId | undefined => {
    const currentIndex = stepOrder.indexOf(currentStepId);
    /** Returner undefined for første steg eller hvis steget ikke finnes i stepOrder */
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
