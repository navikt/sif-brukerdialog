import { SøknadStepId } from '../../config/søknadStepConfig';
import { SøknadStep } from '../../setup/søknad-step/SøknadStep';
import { BarnSøknadsdata } from '../../types/Søknadsdata';
import { BarnForm, BarnFormValues } from './BarnForm';
import { toBarnFormValues, toBarnSøknadsdata } from './barnStegUtils';

export const BarnSteg = () => (
    <SøknadStep<BarnFormValues, BarnSøknadsdata>
        stepId={SøknadStepId.BARN}
        toSøknadsdata={toBarnSøknadsdata}
        toFormValues={toBarnFormValues}>
        {({ defaultValues, onSubmit, onPrevious, isPending, submitDisabled }) => (
            <BarnForm
                defaultValues={defaultValues}
                isPending={isPending}
                submitDisabled={submitDisabled}
                onSubmit={onSubmit}
                onPrevious={onPrevious}
            />
        )}
    </SøknadStep>
);
