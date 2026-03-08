import { SøknadStepId } from '../../config/søknadStepConfig';
import { SøknadStep } from '../../setup/søknad-step/SøknadStep';
import { BostedSøknadsdata } from '../../types/Søknadsdata';
import { BostedForm, BostedFormValues } from './BostedForm';
import { toBostedFormValues, toBostedSøknadsdata } from './bostedStegUtils';

export const BostedSteg = () => (
    <SøknadStep<BostedFormValues, BostedSøknadsdata>
        stepId={SøknadStepId.BOSTED}
        toSøknadsdata={toBostedSøknadsdata}
        toFormValues={toBostedFormValues}>
        {({ defaultValues, isPending, onSubmit, onPrevious, submitDisabled }) => (
            <BostedForm
                defaultValues={defaultValues}
                isPending={isPending}
                submitDisabled={submitDisabled}
                onSubmit={onSubmit}
                onPrevious={onPrevious}
            />
        )}
    </SøknadStep>
);
