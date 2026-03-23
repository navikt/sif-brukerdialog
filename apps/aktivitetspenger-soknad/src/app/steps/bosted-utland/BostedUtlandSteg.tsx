import { SøknadStepId } from '@app/setup/config/søknadStepConfig';
import { SøknadStep } from '@app/setup/søknad/SøknadStep';

import { BostedUtlandForm } from './BostedUtlandForm';

export const BostedUtlandSteg = () => (
    <SøknadStep stepId={SøknadStepId.BOSTED_UTLAND}>
        <BostedUtlandForm />
    </SøknadStep>
);
