import { useSøknadFormValues } from '@sif/soknad/consistency';
import { useMemo } from 'react';

import { Søknadsdata } from '../../types/Søknadsdata';
import { useSøknadsflyt } from '../context/søknadContext';

interface UseStepDefaultValuesOptions<TFormValues, TStepSøknadsdata> {
    stepId: string;
    toFormValues: (søknadsdata: TStepSøknadsdata | undefined) => Partial<TFormValues>;
}

/**
 * Hook for å hente default-verdier for et skjemasteg.
 * Prioriterer lagrede skjemaverdier (fra browser back/forward) over søknadsdata.
 */
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
