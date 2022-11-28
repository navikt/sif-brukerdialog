import { getMedlemskapSøknadsdataFromFormValues } from '../../søknad/steps/medlemskap/medlemskapStepUtils';
import { getPleietrengendeSøknadsdataFromFormValues } from '../../søknad/steps/pleietrengende/pleietrengendeStepUtils';
import { StepId } from '../../types/StepId';

export const getSøknadsdateFromStepFormValues = {
    [StepId.PLEIETRENGENDE]: getPleietrengendeSøknadsdataFromFormValues,
    [StepId.MEDLEMSKAP]: getMedlemskapSøknadsdataFromFormValues,
};
