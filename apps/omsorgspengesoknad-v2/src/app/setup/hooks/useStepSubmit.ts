import { Søknadsdata } from '@app/types/Soknadsdata';
import { useCallback, useState } from 'react';

import { SøknadStepId } from '../config/SoknadStepId';
import { useSøknadsflyt } from '../context/soknadContext';
import { useSøknadMellomlagring } from './useSoknadMellomlagring';

interface UseStepSubmitOptions<TFormValues, TStepSøknadsdata> {
    stepId: SøknadStepId;
    toSøknadsdata: (data: TFormValues) => TStepSøknadsdata;
}

export function useStepSubmit<TFormValues, TStepSøknadsdata>({
    stepId,
    toSøknadsdata,
}: UseStepSubmitOptions<TFormValues, TStepSøknadsdata>) {
    const flow = useSøknadsflyt();
    const { lagreSøknad, isPending } = useSøknadMellomlagring();
    const [submitError, setSubmitError] = useState(false);

    const onSubmit = useCallback(
        async (data: TFormValues) => {
            try {
                setSubmitError(false);
                const stepData = toSøknadsdata(data);
                flow.commitStep(stepId, { [stepId]: stepData } as Partial<Søknadsdata>);
                await lagreSøknad();
                flow.navigateToNextStep(stepId);
            } catch {
                setSubmitError(true);
            }
        },
        [flow, stepId, toSøknadsdata, lagreSøknad],
    );

    return { onSubmit, isPending, submitError };
}
