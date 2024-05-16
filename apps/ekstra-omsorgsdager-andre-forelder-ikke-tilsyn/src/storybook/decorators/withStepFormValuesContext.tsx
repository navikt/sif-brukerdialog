import * as React from 'react';
import { StepFormValuesContextProvider } from '../../app/søknad/context/StepFormValuesContext';
import { StepFormValues } from '../../app/types/StepFormValues';

export const withStepFormValuesContext = (Story, stepFormValues?: StepFormValues) => {
    return (
        <StepFormValuesContextProvider initialValues={stepFormValues}>
            <Story />
        </StepFormValuesContextProvider>
    );
};
