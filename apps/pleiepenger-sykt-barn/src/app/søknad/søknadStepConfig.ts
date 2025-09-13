import { SoknadApplicationType, SoknadStepsConfig, soknadStepUtils } from '@navikt/sif-common-soknad-ds';
import { StepID } from '../types/StepID';
import { SøknadFormValues } from '../types/søknad-form-values/SøknadFormValues';
import { getSøknadsperiodeFromFormValues } from '../utils/formValuesUtils';
import { skalBrukerSvareArbeidstid, skalBrukerSvarePåBeredskapOgNattevåk } from '../utils/stepUtils';

export const getSøknadSteps = (formValues?: SøknadFormValues): StepID[] => {
    const includeNattevåkAndBeredskap = skalBrukerSvarePåBeredskapOgNattevåk(formValues);
    const søknadsperiode = formValues ? getSøknadsperiodeFromFormValues(formValues) : undefined;
    const includeArbeidstid =
        søknadsperiode && formValues ? skalBrukerSvareArbeidstid(søknadsperiode, formValues) : false;

    const steps: StepID[] = [];
    steps.push(StepID.OPPLYSNINGER_OM_BARNET);
    steps.push(StepID.TIDSROM);
    steps.push(StepID.ARBEIDSSITUASJON);
    if (includeArbeidstid) {
        steps.push(StepID.ARBEIDSTID);
    }
    steps.push(StepID.OMSORGSTILBUD);
    if (includeNattevåkAndBeredskap) {
        steps.push(StepID.NATTEVÅK_OG_BEREDSKAP);
    }
    steps.push(StepID.MEDLEMSKAP);
    steps.push(StepID.LEGEERKLÆRING);
    steps.push(StepID.SUMMARY);

    return steps;
};

export const getSøknadStepConfig = (formValues?: SøknadFormValues): SoknadStepsConfig<StepID> =>
    soknadStepUtils.getStepsConfig(getSøknadSteps(formValues), SoknadApplicationType.SOKNAD);
