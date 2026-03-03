import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

type StepFormValues = Record<string, Record<string, unknown> | undefined>;

interface StepFormValuesContextValue {
    stepFormValues: StepFormValues;
    setStepFormValues: (stegId: string, formValues: Record<string, unknown>) => void;
    clearStepFormValues: (stegId: string) => void;
    clearAllSteps: () => void;
}

const StepFormValuesContext = createContext<StepFormValuesContextValue | null>(null);

interface Props {
    children: ReactNode;
    initialValues?: StepFormValues;
}

export const StepFormValuesProvider = ({ children, initialValues }: Props) => {
    const [values, setValues] = useState<StepFormValues>(initialValues ?? {});

    const setStepFormValues = useCallback((stegId: string, formValues: Record<string, unknown>) => {
        setValues((prev) => ({ ...prev, [stegId]: formValues }));
    }, []);

    const clearStepFormValues = useCallback((stegId: string) => {
        setValues((prev) => ({ ...prev, [stegId]: undefined }));
    }, []);

    const clearAllSteps = useCallback(() => {
        setValues({});
    }, []);

    return (
        <StepFormValuesContext.Provider
            value={{
                stepFormValues: values,
                setStepFormValues,
                clearStepFormValues,
                clearAllSteps,
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
