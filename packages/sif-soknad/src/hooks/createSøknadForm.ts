import { useEffect, useRef } from 'react';
import { DefaultValues, useForm, UseFormReturn } from 'react-hook-form';

import { useSøknadFormValues } from '../consistency/SøknadFormValuesContext';
import { StepFormValues } from '../types';

export const createSøknadForm = <TStepId extends string>() => {
    return function useSøknadForm<T extends StepFormValues>(
        stepId: TStepId,
        defaultValues: DefaultValues<T>,
    ): UseFormReturn<T> {
        const { setFormValuesForStep } = useSøknadFormValues();
        const form = useForm<T>({ defaultValues });
        const setFormRef = useRef(setFormValuesForStep);
        setFormRef.current = setFormValuesForStep;

        useEffect(() => {
            return () => {
                setFormRef.current(stepId, form.getValues());
            };
        }, [stepId, form]);

        return form;
    };
};
