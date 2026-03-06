import { createContext, ReactNode, useCallback, useContext, useState } from 'react';

/**
 * StepFormValuesContext
 *
 * Tar vare på skjemadata som ikke er submittet. Brukes for å:
 * 1. Gjenopprette skjemaverdier ved browser back/forward
 * 2. Initialisere fra mellomlagret skjemadata ved reload
 *
 * Ved submit → clearAllStepFormValues() kalles for å fjerne usubmittede verdier.
 */

export type FormValues = Record<string, unknown>;
export type StepsFormValues = Record<string, FormValues | undefined>;

interface StepFormValuesContextValue {
    stepsFormValues: StepsFormValues;
    setStepFormValues: (stepId: string, formValues: Record<string, unknown>) => void;
    clearStepFormValues: (stepId: string) => void;
    clearAllStepFormValues: () => void;
    getStepFormValues: <T = Record<string, unknown>>(stepId: string) => Partial<T> | undefined;
}

const StepFormValuesContext = createContext<StepFormValuesContextValue | null>(null);

interface Props {
    children: ReactNode;
    initialValues?: Record<string, object | undefined>;
}

/**
 * StepsFormValuesProvider
 * Provider for StepFormValuesContext. Skal wrappe hele søknadsflyten for å sikre at
 * skjemadata bevares ved back/forward navigering i nettleser og reload.
 */
export const StepsFormValuesProvider = ({ children, initialValues }: Props) => {
    const [values, setValues] = useState<StepsFormValues>((initialValues as StepsFormValues) ?? {});

    const setStepFormValues = useCallback((stepId: string, formValues: Record<string, unknown>) => {
        setValues((prev) => ({ ...prev, [stepId]: formValues }));
    }, []);

    const clearStepFormValues = useCallback((stepId: string) => {
        setValues((prev) => ({ ...prev, [stepId]: undefined }));
    }, []);

    const clearAllStepsFormValues = useCallback(() => {
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
                stepsFormValues: values,
                setStepFormValues,
                clearStepFormValues,
                clearAllStepFormValues: clearAllStepsFormValues,
                getStepFormValues,
            }}>
            {children}
        </StepFormValuesContext.Provider>
    );
};

export const useStepsFormValues = (): StepFormValuesContextValue => {
    const context = useContext(StepFormValuesContext);
    if (!context) {
        throw new Error('useStepFormValues must be used within StepFormValuesProvider');
    }
    return context;
};
