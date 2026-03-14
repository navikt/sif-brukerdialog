import { DefaultValues, useForm, UseFormReturn } from 'react-hook-form';

import { useSaveSøknadFormValues } from '../consistency/useSaveSøknadFormValues';
import { StepFormValues } from '../types';

export const createSøknadForm = <TStepId extends string>() => {
    return function useSøknadForm<T extends StepFormValues>(
        stepId: TStepId,
        defaultValues: DefaultValues<T>,
    ): UseFormReturn<T> {
        const form = useForm<T>({ defaultValues });
        useSaveSøknadFormValues(stepId, form.getValues);
        return form;
    };
};
