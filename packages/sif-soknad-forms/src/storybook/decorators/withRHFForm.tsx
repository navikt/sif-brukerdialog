import type { Decorator } from '@storybook/react-vite';
import { FormProvider, useForm } from 'react-hook-form';

type RHFParameters = {
    rhf?: {
        defaultValues?: Record<string, unknown>;
    };
};

type RHFFormDecoratorProps = {
    Story: Parameters<Decorator>[0];
    context: Parameters<Decorator>[1];
};

const RHFFormDecorator = ({ Story, context }: RHFFormDecoratorProps) => {
    const parameters = context.parameters as RHFParameters;
    const methods = useForm({ defaultValues: parameters.rhf?.defaultValues });

    return (
        <FormProvider {...methods}>
            <Story />
        </FormProvider>
    );
};

export const withRHFForm: Decorator = (Story, context) => <RHFFormDecorator Story={Story} context={context} />;
