import { SøknadStepId } from '../../config/søknadStepConfig';
import { useStepDefaultValues } from '../../hooks/useStepDefaultValues';
import { useStepSubmit } from '../../hooks/useStepSubmit';
import { SøknadStep } from '../../setup/søknad-step/SøknadStep';
import { BostedSøknadsdata } from '../../types/Søknadsdata';
import { BostedForm, BostedFormValues } from './BostedForm';
import { toBostedFormValues, toBostedSøknadsdata } from './bostedStegUtils';

export const BostedSteg = () => {
    const stepId = SøknadStepId.BOSTED;

    const defaultValues = useStepDefaultValues<BostedFormValues, BostedSøknadsdata>({
        stepId,
        toFormValues: toBostedFormValues,
    });

    const { onSubmit, isPending } = useStepSubmit<BostedFormValues, BostedSøknadsdata>({
        stepId,
        toSøknadsdata: toBostedSøknadsdata,
    });

    return (
        <SøknadStep stepId={stepId}>
            <BostedForm stepId={stepId} isPending={isPending} defaultValues={defaultValues} onSubmit={onSubmit} />
        </SøknadStep>
    );
};
