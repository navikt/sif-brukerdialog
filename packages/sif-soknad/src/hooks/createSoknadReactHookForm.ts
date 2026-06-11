import { useRef } from 'react';
import { DefaultValues, useForm, UseFormReturn } from 'react-hook-form';

import { useSaveSøknadFormValues } from '../consistency/useSaveSoknadFormValues';
import { StepFormValues } from '../types';

/**
 * Adapter for react-hook-form som integrerer med SøknadFormValuesContext for å lagre skjemaverdier ved unmount.
 */
export const createSøknadReactHookForm = <TStepId extends string>() => {
    return function useSøknadForm<T extends StepFormValues>(
        stepId: TStepId,
        defaultValues: DefaultValues<T>,
    ): UseFormReturn<T> {
        const form = useForm<T>({ defaultValues });
        const isDirtyRef = useRef(false);
        isDirtyRef.current = form.formState.isDirty;
        useSaveSøknadFormValues(stepId, form.getValues, () => isDirtyRef.current);
        return form;
    };
};
