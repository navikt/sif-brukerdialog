import { SøknadStepId } from '@app/setup/config/SøknadStepId';
import { SøknadStep } from '@app/setup/søknad/SøknadStep';

import { BostedForm } from './BostedForm';

export const BostedSteg = () => (
    <SøknadStep stepId={SøknadStepId.BOSTED}>
        <BostedForm />
    </SøknadStep>
);
