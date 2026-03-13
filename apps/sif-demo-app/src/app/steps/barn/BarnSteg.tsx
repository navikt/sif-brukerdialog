import { SøknadStep } from '@app/setup/SøknadStep';

import { SøknadStepId } from '@app/setup';
import { BarnForm } from './BarnForm';

export const BarnSteg = () => (
    <SøknadStep stepId={SøknadStepId.BARN}>
        <BarnForm />
    </SøknadStep>
);
