import { Søknadsdata } from '@app/types/Soknadsdata';
import { useSøknadFormValues } from '@sif/soknad/consistency';
import { useMemo } from 'react';

import { useSøknadsflyt } from '../context/soknadContext';

interface UseStepDefaultValuesOptions<TFormValues, TStepSøknadsdata> {
    stepId: string;
    toFormValues: (søknadsdata: TStepSøknadsdata | undefined) => Partial<TFormValues>;
}

export function useStepDefaultValues<TFormValues, TStepSøknadsdata>({
    stepId,
    toFormValues,
}: UseStepDefaultValuesOptions<TFormValues, TStepSøknadsdata>): Partial<TFormValues> {
    const { søknadsdata } = useSøknadsflyt();
    const { getFormValuesForStep } = useSøknadFormValues();

    return useMemo(() => {
        const stepFormValues = getFormValuesForStep<TFormValues>(stepId);
        if (stepFormValues) {
            return stepFormValues;
        }
        const stepSøknadsdata = søknadsdata?.[stepId as keyof Søknadsdata] as TStepSøknadsdata | undefined;
        return toFormValues(stepSøknadsdata);
    }, [søknadsdata, getFormValuesForStep, stepId, toFormValues]);
}
