import { SøknadStep } from '@app/setup/søknad/SøknadStep';
import { SøknadStepId } from '@app/setup/søknad/søknadStepConfig';

import { MedlemskapForm } from './MedlemskapForm';

export const MedlemskapSteg = () => (
    <SøknadStep stepId={SøknadStepId.MEDLEMSKAP}>
        <MedlemskapForm />
    </SøknadStep>
);
