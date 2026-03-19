import { SøknadStepId } from '@app/setup/config/søknadStepConfig';
import { SøknadStep } from '@app/setup/søknad/SøknadStep';

import { KontonummerForm } from './KontonummerForm';

export const KontonummerSteg = () => (
    <SøknadStep stepId={SøknadStepId.KONTONUMMER}>
        <KontonummerForm />
    </SøknadStep>
);
