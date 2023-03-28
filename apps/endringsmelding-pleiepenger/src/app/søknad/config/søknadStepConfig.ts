import { SoknadApplicationType, SoknadStepsConfig } from '@navikt/sif-common-soknad-ds/lib/soknad-step/soknadStepTypes';
import soknadStepUtils from '@navikt/sif-common-soknad-ds/lib/soknad-step/soknadStepUtils';
import { EndringType } from '../../types/EndringType';
import { getEndringerSomSkalGjøres } from '../../utils/endringTypeUtils';
import { StepId } from './StepId';

export const getSøknadSteps = (hvaSkalEndres: EndringType[], harFjernetFerie: boolean): StepId[] => {
    const steps: StepId[] = [];

    const {
        arbeidstidSkalEndres,
        lovbestemtFerieSkalEndres: ferieSkalEndres,
        utenlandsoppholdSkalEndres,
    } = getEndringerSomSkalGjøres(hvaSkalEndres, harFjernetFerie);

    if (ferieSkalEndres) {
        steps.push(StepId.LOVBESTEMT_FERIE);
    }
    if (arbeidstidSkalEndres) {
        steps.push(StepId.ARBEIDSTID);
    }
    if (utenlandsoppholdSkalEndres) {
        steps.push(StepId.UTENLANDSOPPHOLD);
    }
    steps.push(StepId.OPPSUMMERING);
    return steps;
};

export const getSøknadStepConfig = (
    hvaSkalEndres: EndringType[],
    harFjernetFerie: boolean
): SoknadStepsConfig<StepId> =>
    soknadStepUtils.getStepsConfig(getSøknadSteps(hvaSkalEndres, harFjernetFerie), SoknadApplicationType.MELDING);
