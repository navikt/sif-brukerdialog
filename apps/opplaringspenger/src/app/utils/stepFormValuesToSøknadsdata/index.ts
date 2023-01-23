import { getOmBarnetSøknadsdataFromFormValues } from '../../søknad/steps/om-barnet/omBarnetStepUtils';
import { StepId } from '../../types/StepId';

export const getSøknadsdateFromStepFormValues = {
    [StepId.OM_BARNET]: getOmBarnetSøknadsdataFromFormValues,
};
