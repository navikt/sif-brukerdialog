import { SoknadApplicationType, SoknadStepsConfig, soknadStepUtils } from '@navikt/sif-common-soknad-ds';
import { EndringType, Søknadsdata } from '@types';
import { getEndringerSomSkalGjøres } from '../../utils/endringTypeUtils';
import { harFjernetLovbestemtFerie } from '../../utils/lovbestemtFerieUtils';
import { StepId } from './StepId';
import { getSøknadStepRoute } from './SøknadRoutes';

export const getSøknadSteps = (
    hvaSkalEndres: EndringType[],
    søknadsdata: Søknadsdata,
    harUkjentArbeidsforhold: boolean
): StepId[] => {
    const steps: StepId[] = [];

    const { arbeidstidSkalEndres, lovbestemtFerieSkalEndres } = getEndringerSomSkalGjøres(
        hvaSkalEndres,
        harFjernetLovbestemtFerie(søknadsdata.lovbestemtFerie),
        harUkjentArbeidsforhold
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

export const getSøknadStepConfig = (
    hvaSkalEndres: EndringType[],
    søknadsdata: Søknadsdata,
    harUkjentArbeidsforhold: boolean
): SoknadStepsConfig<StepId> =>
    soknadStepUtils.getStepsConfig(
        getSøknadSteps(hvaSkalEndres, søknadsdata, harUkjentArbeidsforhold),
        SoknadApplicationType.MELDING,
        (stepId: StepId) => getSøknadStepRoute(stepId)
    );
