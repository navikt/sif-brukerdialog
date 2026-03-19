import { SøknadStepId } from '@app/setup/config/søknadStepConfig';
import { SøknadStep } from '@app/setup/søknad/SøknadStep';

import { useSøknadState } from '../../setup/hooks';
import { KontonummerForm } from './KontonummerForm';

export const KontonummerSteg = () => {
    const kontonummer = useSøknadState().kontonummer;

    return (
        <SøknadStep stepId={SøknadStepId.KONTONUMMER}>
            <KontonummerForm kontonummerInfo={kontonummer} />
        </SøknadStep>
    );
};
