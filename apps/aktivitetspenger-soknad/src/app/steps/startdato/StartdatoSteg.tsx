import { SøknadStepId } from '@app/setup/config/SoknadStepId';
import { SøknadStep } from '@app/setup/soknad/SoknadStep';

import { StartdatoForm } from './StartdatoForm';

export const StartdatoSteg = () => (
    <SøknadStep stepId={SøknadStepId.STARTDATO}>
        <StartdatoForm />
    </SøknadStep>
);
