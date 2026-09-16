import { SøknadStepId } from '@app/types/SoknadStepId';
import { SøknadStep } from '@sif/soknad-app';

import { OmBarnetForm } from './OmBarnetForm';

export const OmBarnetSteg = () => (
    <SøknadStep stepId={SøknadStepId.OM_BARNET}>
        <OmBarnetForm />
    </SøknadStep>
);
