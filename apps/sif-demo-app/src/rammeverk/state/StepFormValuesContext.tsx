import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

/**
 * StepFormValuesContext
 *
 * Tar vare på skjemadata som ikke er submittet. Brukes for å:
 * 1. Gjenopprette skjemaverdier ved browser back/forward
 * 2. Initialisere fra mellomlagret skjemadata ved reload
 *
 * Ved submit → clearAllSteps() kalles for å fjerne usubmittede verdier.
 */

type StepFormValues = Record<string, Record<string, unknown> | undefined>;

interface StepFormValuesContextValue {
    stepFormValues: StepFormValues;
    setStepFormValues: (stepId: string, formValues: Record<string, unknown>) => void;
    clearStepFormValues: (stepId: string) => void;
    clearAllSteps: () => void;
    getStepFormValues: <T = Record<string, unknown>>(stepId: string) => Partial<T> | undefined;
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
        <T = Record<string, unknown>,>(stepId: string): Partial<T> | undefined => {
            return values[stepId] as Partial<T> | undefined;
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
