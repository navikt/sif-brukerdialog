import { useCallback } from 'react';

import { Søknadsdata } from '../../types/Soknadsdata';
import { SøknadStepId } from '../config/soknadStepConfig';
import { useSøknadsflyt } from '../context/soknadContext';
import { useSøknadMellomlagring } from './useSoknadMellomlagring';

interface UseStepSubmitOptions<TFormValues, TStepSøknadsdata> {
    stepId: SøknadStepId;
    toSøknadsdata: (data: TFormValues) => TStepSøknadsdata;
}

/**
 * Hook for å håndtere submit i et søknadssteg.
 * Mapper formverdier til søknadsdata, oppdaterer søknadsdata i konteksten, mellomlagrer og navigerer til neste steg.
 */
export function useStepSubmit<TFormValues, TStepSøknadsdata>({
    stepId,
    toSøknadsdata,
}: UseStepSubmitOptions<TFormValues, TStepSøknadsdata>) {
    const flow = useSøknadsflyt();
    const { lagreSøknad, isPending } = useSøknadMellomlagring();

    const onSubmit = useCallback(
        async (data: TFormValues) => {
            const stepData = toSøknadsdata(data);
            flow.commitStep(stepId, { [stepId]: stepData } as Partial<Søknadsdata>);
            await lagreSøknad();
            flow.navigateToNextStep(stepId);
        },
        [flow, stepId, toSøknadsdata, lagreSøknad],
    );

    return { onSubmit, isPending };
}
