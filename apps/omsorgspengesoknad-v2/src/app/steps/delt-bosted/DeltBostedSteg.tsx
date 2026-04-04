import { SøknadStepId } from '@app/setup/config/SoknadStepId';
import { SøknadStep } from '@app/setup/soknad/SoknadStep';

import { DeltBostedForm } from './DeltBostedForm';

export const DeltBostedSteg = () => (
    <SøknadStep stepId={SøknadStepId.DELT_BOSTED}>
        <DeltBostedForm />
    </SøknadStep>
);
