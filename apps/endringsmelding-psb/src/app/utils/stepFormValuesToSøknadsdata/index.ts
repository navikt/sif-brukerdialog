import { getArbeidstidSøknadsdataFromFormValues } from '../../søknad/steps/arbeidstid/arbeidstidStepUtils';
import { StepId } from '../../types/StepId';

export const getSøknadsdateFromStepFormValues = {
    [StepId.ARBEIDSTID]: getArbeidstidSøknadsdataFromFormValues,
};
