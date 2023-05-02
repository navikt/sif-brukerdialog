import { SoknadApplicationType, SoknadStepsConfig, soknadStepUtils } from '@navikt/sif-common-soknad-ds';
import { EndringType } from '../../types/EndringType';
import { getEndringerSomSkalGjøres } from '../../utils/endringTypeUtils';
import { StepId } from './StepId';
import { getSøknadStepRoute } from './SøknadRoutes';

export const getSøknadSteps = (
    hvaSkalEndres: EndringType[],
    harFjernetFerie: boolean,
    harNyArbeidsgiver: boolean
): StepId[] => {
    const steps: StepId[] = [];

    const { arbeidstidSkalEndres, lovbestemtFerieSkalEndres: ferieSkalEndres } = getEndringerSomSkalGjøres(
        hvaSkalEndres,
        harFjernetFerie
    );

    if (harNyArbeidsgiver) {
        steps.push(StepId.ARBEIDSSITUASJON);
    }
    if (ferieSkalEndres) {
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
    harFjernetFerie: boolean,
    harNyArbeidsgiver: boolean
): SoknadStepsConfig<StepId> =>
    soknadStepUtils.getStepsConfig(
        getSøknadSteps(hvaSkalEndres, harFjernetFerie, harNyArbeidsgiver),
        SoknadApplicationType.MELDING,
        (stepId: StepId) => getSøknadStepRoute(stepId)
    );
