import { getArbeidstidSøknadsdataFromFormValues } from '../../søknad/steps/arbeidstid/arbeidstidStepUtils';
import { StepId } from '../../søknad/config/StepId';

export const getSøknadsdateFromStepFormValues = {
    [StepId.AKTIVITET]: getArbeidstidSøknadsdataFromFormValues,
    [StepId.ARBEIDSTID]: getArbeidstidSøknadsdataFromFormValues,
};
