import React, { createContext, FunctionComponent, useContext, useState } from 'react';
import { StepFormValues } from '../config/StepFormValues';
import { StepId } from '../config/StepId';

interface StepFormValuesContextInterface {
    stepFormValues: StepFormValues;
    clearAllSteps: () => void;
    clearStepFormValues: (stepId: StepId) => void;
    setStepFormValues: (stepId: StepId, formValues: StepFormValues) => void;
}

const StepFormValuesContext = createContext<StepFormValuesContextInterface>(null!);

export const useStepFormValuesContext = () => useContext(StepFormValuesContext);

interface Props {
    children: React.ReactNode;
}

export const StepFormValuesContextProvider: FunctionComponent<Props> = ({ children }) => {
    const [values, setValues] = useState<StepFormValues>({});
    return (
        <StepFormValuesContext.Provider
            value={{
                stepFormValues: values,
                clearStepFormValues: (stepId: StepId) => {
                    setValues({ ...values, [stepId]: undefined });
                },
                clearAllSteps: () => {
                    setValues({});
                },
                setStepFormValues: (stepId: StepId, formValues: StepFormValues) => {
                    setValues({ ...values, [stepId]: formValues[stepId] });
                },
            }}>
            {children}
        </StepFormValuesContext.Provider>
    );
};
