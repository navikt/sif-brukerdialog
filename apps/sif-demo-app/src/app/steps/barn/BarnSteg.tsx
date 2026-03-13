import { SøknadStep } from '@app/setup/søknad/SøknadStep';
import { SøknadStepId } from '@app/setup/søknad/søknadStepConfig';

import { BarnForm } from './BarnForm';

export const BarnSteg = () => (
    <SøknadStep stepId={SøknadStepId.BARN}>
        <BarnForm />
    </SøknadStep>
);
