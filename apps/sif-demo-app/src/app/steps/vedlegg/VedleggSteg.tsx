import { SøknadStepId } from '@app/setup/config/soknadStepConfig';
import { SøknadStep } from '@app/setup/soknad/SoknadStep';

import { VedleggForm } from './VedleggForm';

export const VedleggSteg = () => (
    <SøknadStep stepId={SøknadStepId.VEDLEGG}>
        <VedleggForm />
    </SøknadStep>
);