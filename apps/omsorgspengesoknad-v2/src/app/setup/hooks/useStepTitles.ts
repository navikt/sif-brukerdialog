import { useAppIntl } from '@app/i18n';

import { SøknadStepId } from '../config/SoknadStepId';

export const useStepTitles = (): Record<SøknadStepId, string> => {
    const { text } = useAppIntl();

    const stepTitles: Record<SøknadStepId, string> = {
        [SøknadStepId.OM_BARNET]: text('step.omBarnet.title'),
        [SøknadStepId.LEGEERKLÆRING]: text('step.legeerklaering.title'),
        [SøknadStepId.DELT_BOSTED]: text('step.deltBosted.title'),
        [SøknadStepId.OPPSUMMERING]: text('step.oppsummering.title'),
    };
    return stepTitles;
};
