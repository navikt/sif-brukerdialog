import { getDeltBostedSøknadsdataFromFormValues } from '../../søknad/steps/delt-bosted/deltBostedStepUtils';
import { getLegeerklæringSøknadsdataFromFormValues } from '../../søknad/steps/legeerklæring/legeerklæringStepUtils';
import { getOmBarnetSøknadsdataFromFormValues } from '../../søknad/steps/om-barnet/omBarnetStepUtils';
import { StepId } from '../../types/StepId';

export const getSøknadsdateFromStepFormValues = {
    [StepId.OM_BARNET]: getOmBarnetSøknadsdataFromFormValues,
    [StepId.DELT_BOSTED]: getDeltBostedSøknadsdataFromFormValues,
    [StepId.LEGEERKLÆRING]: getLegeerklæringSøknadsdataFromFormValues,
};
