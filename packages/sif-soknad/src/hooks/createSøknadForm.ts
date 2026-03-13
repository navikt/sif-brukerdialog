import { useEffect, useRef } from 'react';
import { DefaultValues, useForm, UseFormReturn } from 'react-hook-form';

import { StepFormValues } from '../types';

interface SøknadContextForForm {
    setFormValuesForStep: (stepId: string, values: StepFormValues) => void;
}

/**
 * Factory for å lage useSøknadForm-hook.
 * Wrapper react-hook-form med auto-lagring ved unmount.
 */
export const createSøknadForm = <TStepId extends string>(useSøknadContext: () => SøknadContextForForm) => {
    return function useSøknadForm<T extends StepFormValues>(
        stepId: TStepId,
        defaultValues: DefaultValues<T>,
    ): UseFormReturn<T> {
        const ctx = useSøknadContext();
        const form = useForm<T>({ defaultValues });
        const ctxRef = useRef(ctx);
        ctxRef.current = ctx;

        useEffect(() => {
            return () => {
                ctxRef.current.setFormValuesForStep(stepId, form.getValues());
            };
        }, [stepId, form]);

        return form;
    };
};
