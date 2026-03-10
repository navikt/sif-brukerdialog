import { SøknadStepId } from '../../config/søknadStepConfig';
import { SøknadStep } from '../../setup/søknad-step/SøknadStep';
import { BarnForm } from './BarnForm';

export const BarnSteg = () => (
    <SøknadStep stepId={SøknadStepId.BARN}>
        <BarnForm />
    </SøknadStep>
);
