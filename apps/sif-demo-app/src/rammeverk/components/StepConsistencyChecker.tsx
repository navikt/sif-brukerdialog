import { ReactNode, useMemo } from 'react';

import { useStepFormValues } from '../state/StepFormValuesContext';

type FormValuesToSøknadsdataFn = (
    stepId: string,
    formValues: Record<string, unknown>,
) => Record<string, unknown> | undefined;

type GetSøknadsdataForStepFn = (stepId: string) => Record<string, unknown> | undefined;

interface StepConsistencyCheckerProps {
    currentStepId: string;
    stepOrder: string[];
    getSøknadsdataForStep: GetSøknadsdataForStepFn;
    formValuesToSøknadsdata: FormValuesToSøknadsdataFn;
    isEqual?: (a: unknown, b: unknown) => boolean;
    children: (invalidStepId: string | null) => ReactNode;
}

const defaultIsEqual = (a: unknown, b: unknown): boolean => {
    return JSON.stringify(a) === JSON.stringify(b);
};

/**
 * Sjekker om formValues for tidligere steg matcher lagret søknadsdata.
 * Brukes for å oppdage om bruker har endret data uten å submitte (f.eks. via nettleserens forward-knapp).
 *
 * Render prop-pattern gir appen full kontroll over hvordan advarselen rendres.
 *
 * @example
 * ```tsx
 * <StepConsistencyChecker
 *   currentStepId={stepId}
 *   stepOrder={stepOrder}
 *   getSøknadsdataForStep={(id) => søknadsdata[id]}
 *   formValuesToSøknadsdata={formValuesToSøknadsdata}
 * >
 *   {(invalidStepId) => invalidStepId && <Alert>Du har ulagrede endringer</Alert>}
 * </StepConsistencyChecker>
 * ```
 */
export const StepConsistencyChecker = ({
    currentStepId,
    stepOrder,
    getSøknadsdataForStep,
    formValuesToSøknadsdata,
    isEqual = defaultIsEqual,
    children,
}: StepConsistencyCheckerProps) => {
    const { stepFormValues } = useStepFormValues();

    const invalidStepId = useMemo(() => {
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

    return <>{children(invalidStepId)}</>;
};
