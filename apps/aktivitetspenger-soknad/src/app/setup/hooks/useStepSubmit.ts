import { useCallback } from 'react';

import { Søknadsdata } from '../../types/Søknadsdata';
import { SøknadStepId } from '../config/søknadStepConfig';
import { useSøknadFlow } from '../context/søknadContext';
import { useSøknadMellomlagring } from './useSøknadMellomlagring';

interface UseStepSubmitOptions<TFormValues, TStepSøknadsdata> {
    stepId: SøknadStepId;
    toSøknadsdata: (data: TFormValues) => TStepSøknadsdata;
}

export function useStepSubmit<TFormValues, TStepSøknadsdata>({
    stepId,
    toSøknadsdata,
}: UseStepSubmitOptions<TFormValues, TStepSøknadsdata>) {
    const flow = useSøknadFlow();
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
