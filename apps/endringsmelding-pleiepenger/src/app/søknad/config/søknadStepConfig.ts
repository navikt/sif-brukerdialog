import { SoknadApplicationType, SoknadStepsConfig, soknadStepUtils } from '@navikt/sif-common-soknad-ds';
import { EndringType, Søknadsdata } from '@types';
import { getEndringerSomSkalGjøres, harFjernetLovbestemtFerie } from '@utils';
import { StepId } from './StepId';
import { getSøknadStepRoute } from './SøknadRoutes';

export const getSøknadSteps = (
    valgtHvaSkalEndres: EndringType[],
    harUkjentArbeidsforhold: boolean,
    søknadsdata?: Søknadsdata
): StepId[] => {
    const steps: StepId[] = [];

    const { arbeidstidSkalEndres, lovbestemtFerieSkalEndres } = getEndringerSomSkalGjøres(
        valgtHvaSkalEndres,
        harFjernetLovbestemtFerie(søknadsdata?.lovbestemtFerie),
        søknadsdata?.ukjentArbeidsforhold?.arbeidsforhold
    );
    if (harUkjentArbeidsforhold) {
        steps.push(StepId.UKJENT_ARBEIDSFOHOLD);
    }
    if (lovbestemtFerieSkalEndres) {
        steps.push(StepId.LOVBESTEMT_FERIE);
    }
    if (arbeidstidSkalEndres) {
        steps.push(StepId.ARBEIDSTID);
    }
    steps.push(StepId.OPPSUMMERING);
    return steps;
};

export const getSøknadStepConfig = (søknadSteps: StepId[]): SoknadStepsConfig<StepId> =>
    soknadStepUtils.getStepsConfig(søknadSteps, SoknadApplicationType.MELDING, (stepId: StepId) =>
        getSøknadStepRoute(stepId)
    );
