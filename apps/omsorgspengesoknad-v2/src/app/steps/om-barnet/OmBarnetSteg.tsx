import { SøknadStepId } from '@app/setup/config/SoknadStepId';
import { SøknadStep } from '@app/setup/soknad/SoknadStep';

import { OmBarnetForm } from './OmBarnetForm';

export const OmBarnetSteg = () => (
    <SøknadStep stepId={SøknadStepId.OM_BARNET}>
        <OmBarnetForm />
    </SøknadStep>
);
