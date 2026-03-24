import { SøknadStepId } from '@app/setup/config/soknadStepConfig';
import { SøknadStep } from '@app/setup/soknad/SoknadStep';

import { BarnForm } from './BarnForm';

export const BarnSteg = () => (
    <SøknadStep stepId={SøknadStepId.BARN}>
        <BarnForm />
    </SøknadStep>
);
