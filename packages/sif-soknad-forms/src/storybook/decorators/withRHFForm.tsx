import type { Decorator } from '@storybook/react-vite';
import { FormProvider, useForm } from 'react-hook-form';

type RHFParameters = {
    rhf?: {
        defaultValues?: Record<string, unknown>;
    };
};

export const withRHFForm: Decorator = (Story, context) => {
    const parameters = context.parameters as RHFParameters;
    const methods = useForm({ defaultValues: parameters.rhf?.defaultValues });

    return (
        <FormProvider {...methods}>
            <Story />
        </FormProvider>
    );
};
