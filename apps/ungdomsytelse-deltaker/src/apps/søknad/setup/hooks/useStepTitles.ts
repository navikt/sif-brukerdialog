import { useAppIntl } from '@shared/i18n';

import { SøknadStepId } from '../config/SøknadStepId';

export const useStepTitles = (): Record<SøknadStepId, string> => {
    const { text } = useAppIntl();

    return {
        [SøknadStepId.KONTONUMMER]: text('step.kontonummer.title'),
        [SøknadStepId.BARN]: text('step.barn.title'),
        [SøknadStepId.OPPSUMMERING]: text('step.oppsummering.title'),
    };
};
