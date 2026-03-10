import { SøknadStepId } from '../../config/søknadStepConfig';
import { useStepDefaultValues } from '../../hooks/useStepDefaultValues';
import { useStepSubmit } from '../../hooks/useStepSubmit';
import { SøknadStep } from '../../setup/søknad-step/SøknadStep';
import { BarnSøknadsdata } from '../../types/Søknadsdata';
import { BarnForm, BarnFormValues } from './BarnForm';
import { toBarnFormValues, toBarnSøknadsdata } from './barnStegUtils';

export const BarnSteg = () => {
    const stepId = SøknadStepId.BARN;

    const defaultValues = useStepDefaultValues<BarnFormValues, BarnSøknadsdata>({
        stepId,
        toFormValues: toBarnFormValues,
    });

    const { onSubmit, isPending } = useStepSubmit<BarnFormValues, BarnSøknadsdata>({
        stepId,
        toSøknadsdata: toBarnSøknadsdata,
    });

    return (
        <SøknadStep stepId={stepId}>
            <BarnForm stepId={stepId} isPending={isPending} defaultValues={defaultValues} onSubmit={onSubmit} />
        </SøknadStep>
    );
};
