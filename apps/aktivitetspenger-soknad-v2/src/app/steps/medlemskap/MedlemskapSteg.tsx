import { SøknadStepId } from '@app/setup/config/søknadStepConfig';
import { SøknadStep } from '@app/setup/søknad/SøknadStep';

import { MedlemskapForm } from './MedlemskapForm';

export const MedlemskapSteg = () => (
    <SøknadStep stepId={SøknadStepId.MEDLEMSKAP}>
        <MedlemskapForm />
    </SøknadStep>
);
