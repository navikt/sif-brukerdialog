import { SøknadStepId } from '@app/setup/config/SøknadStepId';
import { SøknadStep } from '@app/setup/søknad/SøknadStep';

import { useSøknadState } from '../../setup/hooks';
import { KontonummerForm } from './KontonummerForm';

export const KontonummerSteg = () => {
    const kontonummer = useSøknadState().kontoInfo;

    return (
        <SøknadStep stepId={SøknadStepId.KONTONUMMER}>
            <KontonummerForm kontonummerInfo={kontonummer} />
        </SøknadStep>
    );
};
