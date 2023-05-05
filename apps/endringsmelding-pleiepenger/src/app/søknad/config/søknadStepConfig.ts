import { SoknadApplicationType, SoknadStepsConfig, soknadStepUtils } from '@navikt/sif-common-soknad-ds';
import { EndringType } from '../../types/EndringType';
import { Søknadsdata } from '../../types/søknadsdata/Søknadsdata';
import { getEndringerSomSkalGjøres } from '../../utils/endringTypeUtils';
import { harFjernetLovbestemtFerie } from '../../utils/lovbestemtFerieUtils';
import { harNyArbeidsgiverMedRedusertJobb } from '../../utils/nyArbeidsgiverUtils';
import { StepId } from './StepId';
import { getSøknadStepRoute } from './SøknadRoutes';

export const getSøknadSteps = (
    hvaSkalEndres: EndringType[],
    søknadsdata: Søknadsdata,
    harNyArbeidsgiver: boolean
): StepId[] => {
    const steps: StepId[] = [];

    const { arbeidstidSkalEndres, lovbestemtFerieSkalEndres } = getEndringerSomSkalGjøres(
        hvaSkalEndres,
        harFjernetLovbestemtFerie(søknadsdata.lovbestemtFerie),
        harNyArbeidsgiverMedRedusertJobb(søknadsdata.arbeidssituasjon?.arbeidsforhold)
    );

    if (harNyArbeidsgiver) {
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
    harNyttArbeidsforhold: boolean
): SoknadStepsConfig<StepId> =>
    soknadStepUtils.getStepsConfig(
        getSøknadSteps(hvaSkalEndres, søknadsdata, harNyttArbeidsforhold),
        SoknadApplicationType.MELDING,
        (stepId: StepId) => getSøknadStepRoute(stepId)
    );
