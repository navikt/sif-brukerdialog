import { SøknadStepId } from '@app/setup/config/SøknadStepId';
import { useSøknadState } from '@app/setup/hooks';
import { SøknadStep } from '@app/setup/søknad/SøknadStep';

import { KontonummerForm } from './KontonummerForm';

export const KontonummerSteg = () => {
    const kontonummer = useSøknadState().kontoInfo;

    return (
        <SøknadStep stepId={SøknadStepId.KONTONUMMER}>
            <KontonummerForm kontonummerInfo={kontonummer} />
        </SøknadStep>
    );
};
