import { SoknadApplicationType, SoknadStepsConfig, soknadStepUtils } from '@navikt/sif-common-soknad-ds';
import { EndringType } from '../../types/EndringType';
import { Søknadsdata } from '../../types/søknadsdata/Søknadsdata';
import { getEndringerSomSkalGjøres } from '../../utils/endringTypeUtils';
import { harFjernetLovbestemtFerie } from '../../utils/lovbestemtFerieUtils';
import { harUkjentArbeidsgiverMedRedusertJobb } from '../../utils/ukjentArbeidsgiverUtils';
import { StepId } from './StepId';
import { getSøknadStepRoute } from './SøknadRoutes';

export const getSøknadSteps = (
    hvaSkalEndres: EndringType[],
    søknadsdata: Søknadsdata,
    harUkjentArbeidsgiver: boolean
): StepId[] => {
    const steps: StepId[] = [];

    const { arbeidstidSkalEndres, lovbestemtFerieSkalEndres } = getEndringerSomSkalGjøres(
        hvaSkalEndres,
        harFjernetLovbestemtFerie(søknadsdata.lovbestemtFerie),
        harUkjentArbeidsgiverMedRedusertJobb(søknadsdata.arbeidssituasjon?.arbeidsforhold)
    );

    if (harUkjentArbeidsgiver) {
        steps.push(StepId.ARBEIDSSITUASJON);
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
