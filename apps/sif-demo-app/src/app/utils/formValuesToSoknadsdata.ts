import { SøknadStepId } from '@app/types/SoknadStepId';

import { toBarnSøknadsdata } from '../steps/barn/barnStegUtils';
import { BarnFormValues } from '../steps/barn/types';
import { toBostedSøknadsdata } from '../steps/bosted/bostedStegUtils';
import { BostedFormValues } from '../steps/bosted/types';
import { toVedleggSøknadsdata } from '../steps/vedlegg/vedleggStegUtils';
import { VedleggFormValues } from '../steps/vedlegg/types';

export const formValuesToSøknadsdata = (
    stepId: string,
    formValues: Record<string, unknown>,
): Record<string, unknown> | undefined => {
    switch (stepId) {
        case SøknadStepId.BARN:
            return toBarnSøknadsdata(formValues as BarnFormValues);
        case SøknadStepId.BOSTED:
            return toBostedSøknadsdata(formValues as BostedFormValues);
        case SøknadStepId.VEDLEGG:
            return toVedleggSøknadsdata(formValues as VedleggFormValues);
        default:
            return undefined;
    }
};
