import { useSøknadFormValues } from '@sif/soknad/consistency';
import { useCallback } from 'react';

import { Søknadsdata } from '../../types/Søknadsdata';
import { useSøknadFlow } from '../context/søknadContext';
import { useSøknadMellomlagring } from './useSøknadMellomlagring';

interface UseStepSubmitOptions<TFormValues, TStepSøknadsdata> {
    stepId: string;
    toSøknadsdata: (data: TFormValues) => TStepSøknadsdata;
}

/**
 * Hook for å håndtere submit i et søknadssteg.
 * Lagrer data til store, mellomlagrer, og navigerer til neste steg.
 */
export function useStepSubmit<TFormValues, TStepSøknadsdata>({
    stepId,
    toSøknadsdata,
}: UseStepSubmitOptions<TFormValues, TStepSøknadsdata>) {
    const flow = useSøknadFlow();
    const { clearFormValuesForStep } = useSøknadFormValues();
    const { lagreSøknad, isPending } = useSøknadMellomlagring();

    const onSubmit = useCallback(
        async (data: TFormValues) => {
            const mapped = toSøknadsdata(data);
            flow.setSøknadsdata({ [stepId]: mapped } as Partial<Søknadsdata>);
            await lagreSøknad();
            clearFormValuesForStep(stepId);
            flow.navigateToNextStep(stepId);
        },
        [flow, clearFormValuesForStep, stepId, toSøknadsdata, lagreSøknad],
    );

    return { onSubmit, isPending };
}
