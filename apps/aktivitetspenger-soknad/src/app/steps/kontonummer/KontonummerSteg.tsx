import { SøknadStepId } from '@app/setup/config/SoknadStepId';
import { useSøknadState } from '@app/setup/hooks';
import { SøknadStep } from '@app/setup/soknad/SoknadStep';

import { KontonummerForm } from './KontonummerForm';

export const KontonummerSteg = () => {
    const kontonummer = useSøknadState().kontoInfo;

    return (
        <SøknadStep stepId={SøknadStepId.KONTONUMMER}>
            <KontonummerForm kontonummerInfo={kontonummer} />
        </SøknadStep>
    );
};
