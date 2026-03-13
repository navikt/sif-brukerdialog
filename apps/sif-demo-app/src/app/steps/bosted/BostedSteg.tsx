import { SøknadStep } from '@app/setup/SøknadStep';

import { SøknadStepId } from '../../config/søknadStepConfig';
import { BostedForm } from './BostedForm';

export const BostedSteg = () => (
    <SøknadStep stepId={SøknadStepId.BOSTED}>
        <BostedForm />
    </SøknadStep>
);
