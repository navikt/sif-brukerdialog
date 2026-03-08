import { SøknadStep } from '../../setup/søknad-step/SøknadStep';
import { SøknadStepId } from '../../config/søknadStepConfig';
import { BostedSøknadsdata } from '../../types/Søknadsdata';
import { BostedForm, BostedFormValues } from './BostedForm';
import { toBostedFormValues, toBostedSøknadsdata } from './bostedStegUtils';

export const BostedSteg = () => (
    <SøknadStep<BostedFormValues, BostedSøknadsdata>
        stepId={SøknadStepId.BOSTED}
        toSøknadsdata={toBostedSøknadsdata}
        toFormValues={toBostedFormValues}>
        {({ defaultValues, isPending, onSubmit, onPrevious }) => (
            <BostedForm
                defaultValues={defaultValues}
                isPending={isPending}
                onSubmit={onSubmit}
                onPrevious={onPrevious}
            />
        )}
    </SøknadStep>
);
