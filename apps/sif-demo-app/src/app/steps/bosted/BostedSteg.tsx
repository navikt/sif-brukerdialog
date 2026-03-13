import { SøknadStep } from '@app/søknad-setup/SøknadStep';

import { SøknadStepId } from '../../config/søknadStepConfig';
import { BostedForm } from './BostedForm';

export const BostedSteg = () => (
    <SøknadStep stepId={SøknadStepId.BOSTED}>
        <BostedForm />
    </SøknadStep>
);
