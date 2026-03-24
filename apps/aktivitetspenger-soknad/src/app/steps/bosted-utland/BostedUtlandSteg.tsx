import { SøknadStepId } from '@app/setup/config/SoknadStepId';
import { SøknadStep } from '@app/setup/soknad/SoknadStep';

import { BostedUtlandForm } from './BostedUtlandForm';

export const BostedUtlandSteg = () => (
    <SøknadStep stepId={SøknadStepId.BOSTED_UTLAND}>
        <BostedUtlandForm />
    </SøknadStep>
);
