import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

/**
 * StepFormValuesContext
 *
 * Brukes til å oppdage når bruker navigerer med nettleserens forward-knapp
 * uten å submitte skjemadata.
 *
 * Flyt:
 * 1. Når bruker forlater et steg → usePersistFormValues lagrer getValues() hit
 * 2. Når bruker lander på neste steg → useStepFormValuesStatus sammenligner
 *    lagrede formValues med faktisk søknadsdata
 * 3. Hvis ulik → bruker har endret data uten å submitte (forward-knapp)
 * 4. Ved submit → clearStepFormValues() kalles FØR navigasjon for å unngå
 *    falske positiver
 *
 * Viktig: Denne context'en holder IKKE på faktisk søknadsdata, kun en
 * midlertidig kopi av skjemaverdier for validering.
 */

type StepFormValues = Record<string, Record<string, unknown> | undefined>;

interface StepFormValuesContextValue {
    stepFormValues: StepFormValues;
    setStepFormValues: (stepId: string, formValues: Record<string, unknown>) => void;
    clearStepFormValues: (stepId: string) => void;
    clearAllSteps: () => void;
    getStepFormValues: (stepId: string) => Record<string, unknown> | undefined;
}

const StepFormValuesContext = createContext<StepFormValuesContextValue | null>(null);

interface Props {
    children: ReactNode;
    initialValues?: Record<string, object | undefined>;
}

export const StepFormValuesProvider = ({ children, initialValues }: Props) => {
    const [values, setValues] = useState<StepFormValues>((initialValues as StepFormValues) ?? {});

    const setStepFormValues = useCallback((stepId: string, formValues: Record<string, unknown>) => {
        setValues((prev) => ({ ...prev, [stepId]: formValues }));
    }, []);

    const clearStepFormValues = useCallback((stepId: string) => {
        setValues((prev) => ({ ...prev, [stepId]: undefined }));
    }, []);

    const clearAllSteps = useCallback(() => {
        setValues({});
    }, []);

    const getStepFormValues = useCallback(
        (stepId: string): Record<string, unknown> | undefined => {
            return values[stepId];
        },
        [values],
    );

    return (
        <StepFormValuesContext.Provider
            value={{
                stepFormValues: values,
                setStepFormValues,
                clearStepFormValues,
                clearAllSteps,
                getStepFormValues,
            }}>
            {children}
        </StepFormValuesContext.Provider>
    );
};

export const useStepFormValues = (): StepFormValuesContextValue => {
    const context = useContext(StepFormValuesContext);
    if (!context) {
        throw new Error('useStepFormValues must be used within StepFormValuesProvider');
    }
    return context;
};
