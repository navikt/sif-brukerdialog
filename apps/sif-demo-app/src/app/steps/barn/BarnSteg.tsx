import { SøknadStep } from '@app/søknad-setup/SøknadStep';

import { SøknadStepId } from '../../config/søknadStepConfig';
import { BarnForm } from './BarnForm';

export const BarnSteg = () => (
    <SøknadStep stepId={SøknadStepId.BARN}>
        <BarnForm />
    </SøknadStep>
);
