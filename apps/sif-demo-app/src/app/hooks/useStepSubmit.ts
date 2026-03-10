import { useCallback } from 'react';

import { useSøknadContext } from '../context/søknadContext';
import { useSøknadMellomlagring } from './useSøknadMellomlagring';
import { Søknadsdata } from '../types/Søknadsdata';

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
    const ctx = useSøknadContext();
    const { lagreSøknad, isPending } = useSøknadMellomlagring();

    const onSubmit = useCallback(
        async (data: TFormValues) => {
            const mapped = toSøknadsdata(data);
            ctx.setSøknadsdata({ [stepId]: mapped } as Partial<Søknadsdata>);
            await lagreSøknad();
            ctx.clearFormValuesForStep(stepId);
            ctx.navigateToNextStep(stepId);
        },
        [ctx, stepId, toSøknadsdata, lagreSøknad],
    );

    return { onSubmit, isPending };
}
