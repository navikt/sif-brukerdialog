import { SøknadStepId } from '@app/setup/config/soknadStepConfig';
import { StepFormValues, StepSøknadsdata } from '@sif/soknad/types';

import { toBarnSøknadsdata } from '../steps/barn/barnStegUtils';
import { BarnFormValues } from '../steps/barn/types';
import { BostedFormValues } from '../steps/bosted/BostedForm';
import { toBostedSøknadsdata } from '../steps/bosted/bostedStegUtils';
import { VedleggFormValues } from '../steps/vedlegg/types';
import { toVedleggSøknadsdata } from '../steps/vedlegg/vedleggStegUtils';

export const formValuesToSøknadsdata = (stepId: string, formValues: StepFormValues): StepSøknadsdata | undefined => {
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
