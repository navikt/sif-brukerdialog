import { SøknadStepId } from '@app/setup/config/SoknadStepId';
import { SøknadStep } from '@app/setup/soknad/SoknadStep';

import { BostedForm } from './BostedForm';

export const BostedSteg = () => (
    <SøknadStep stepId={SøknadStepId.BOSTED}>
        <BostedForm />
    </SøknadStep>
);
