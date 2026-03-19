import { SøknadStep } from '@app/setup/søknad/SøknadStep';
import { SøknadStepId } from '@app/setup/søknad/søknadStepConfig';

import { KontonummerForm } from './KontonummerForm';

export const KontonummerSteg = () => (
    <SøknadStep stepId={SøknadStepId.KONTONUMMER}>
        <KontonummerForm />
    </SøknadStep>
);
