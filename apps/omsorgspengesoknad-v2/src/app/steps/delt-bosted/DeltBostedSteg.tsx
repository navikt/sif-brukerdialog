import { SøknadStepId } from '@app/types/SoknadStepId';
import { SøknadStep } from '@sif/soknad-app';

import { DeltBostedForm } from './DeltBostedForm';

export const DeltBostedSteg = () => (
    <SøknadStep stepId={SøknadStepId.DELT_BOSTED}>
        <DeltBostedForm />
    </SøknadStep>
);
