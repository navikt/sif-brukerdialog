import { SøknadStepId } from '../../config/søknadStepConfig';
import { SøknadStep } from '../../setup/søknad-step/SøknadStep';
import { BostedForm } from './BostedForm';

export const BostedSteg = () => (
    <SøknadStep stepId={SøknadStepId.BOSTED}>
        <BostedForm />
    </SøknadStep>
);
