import { SøknadStepId } from '@app/setup';
import { SøknadStep } from '@app/setup/SøknadStep';

import { BarnForm } from './BarnForm';

export const BarnSteg = () => (
    <SøknadStep stepId={SøknadStepId.BARN}>
        <BarnForm />
    </SøknadStep>
);
