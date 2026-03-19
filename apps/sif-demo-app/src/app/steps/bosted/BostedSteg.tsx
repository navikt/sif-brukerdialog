import { SøknadStep } from '@app/setup/søknad/SøknadStep';
import { SøknadStepId } from '@app/setup/søknad/søknadStepConfig';

import { BostedForm } from './BostedForm';

export const BostedSteg = () => (
    <SøknadStep stepId={SøknadStepId.BOSTED}>
        <BostedForm />
    </SøknadStep>
);
