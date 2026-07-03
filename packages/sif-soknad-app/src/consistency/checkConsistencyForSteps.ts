import { StepFormValuesMap, StepFormValues } from './SøknadStepFormContext';

type FormValuesToSøknadsdataFn = (stepId: string, formValues: StepFormValues) => Record<string, unknown> | undefined;

type GetSøknadsdataForStepFn = (stepId: string) => Record<string, unknown> | undefined;

interface CheckConsistencyParams {
    currentStepId: string;
    stepOrder: string[];
    formValues: StepFormValuesMap;
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

/**
 * Sjekker om skjemadata for foregående steg er konsistent med lagrede søknadsdata.
 * Returnerer stepId for det første steget som har ulagrede endringer, eller undefined.
 *
 * Fanger opp tilfeller der bruker navigerer med browser back/forward uten å submitte.
 */
export const checkConsistencyForSteps = ({
    currentStepId,
    stepOrder,
    formValues,
    getSøknadsdataForStep,
    formValuesToSøknadsdata,
}: CheckConsistencyParams): string | undefined => {
    const currentIndex = stepOrder.indexOf(currentStepId);
    if (currentIndex <= 0) return undefined;

    const precedingSteps = stepOrder.slice(0, currentIndex);

    for (const stepId of precedingSteps) {
        const stepFormValues = formValues[stepId];
        if (!stepFormValues) continue;

        try {
            const søknadsdata = getSøknadsdataForStep(stepId);
            const convertedStepSøknadsdata = formValuesToSøknadsdata(stepId, stepFormValues);
            if (!isEqualNormalized(convertedStepSøknadsdata, søknadsdata)) {
                return stepId;
            }
        } catch {
            // Hopp over steget ved konverteringsfeil
        }
    }

    return undefined;
};
