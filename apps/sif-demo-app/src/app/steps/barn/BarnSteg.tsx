import { SøknadStepId } from '@app/setup/config/søknadStepConfig';
import { SøknadStep } from '@app/setup/søknad/SøknadStep';

import { BarnForm } from './BarnForm';

export const BarnSteg = () => (
    <SøknadStep stepId={SøknadStepId.BARN}>
        <BarnForm />
    </SøknadStep>
);
