import { useAppIntl } from '@app/i18n';

import { SøknadStepId } from '../config/SoknadStepId';

export const useStepTitles = (): Record<SøknadStepId, string> => {
    const { text } = useAppIntl();

    const stepTitles: Record<SøknadStepId, string> = {
        [SøknadStepId.STARTDATO]: text('step.startdato.title'),
        [SøknadStepId.KONTONUMMER]: text('step.kontonummer.title'),
        [SøknadStepId.BOSTED]: text('step.bosted.title'),
        [SøknadStepId.BOSTED_UTLAND]: text('step.bostedUtland.title'),
        [SøknadStepId.BARN]: text('step.barn.title'),
        [SøknadStepId.OPPSUMMERING]: text('step.oppsummering.title'),
    };
    return stepTitles;
};
