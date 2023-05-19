import { SoknadApplicationType, SoknadStepsConfig, soknadStepUtils, StepConfig } from '@navikt/sif-common-soknad-ds';
import { StepId } from '../types/StepId';
import { Søknadsdata } from '../types/søknadsdata/Søknadsdata';
import { getSøknadStepRoute } from '../utils/søknadRoutesUtils';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib/types';

export const includeFraværFraStep = (arbeidssituasjon?: ArbeidssituasjonSøknadsdata): boolean => {
    const erFrilanser = arbeidssituasjon?.frilans_erFrilanser === YesOrNo.YES;
    const erSelvstendigNæringsdrivende = arbeidssituasjon?.selvstendig_erSelvstendigNæringsdrivende === YesOrNo.YES;
    return erFrilanser && erSelvstendigNæringsdrivende;
};

const getSøknadSteps = (søknadsdata: Søknadsdata): StepId[] => {
    return [
        StepId.DINE_BARN,
        StepId.FRAVÆR,
        StepId.LEGEERKLÆRING,
        StepId.ARBEIDSSITUASJON,
        ...(includeFraværFraStep(søknadsdata?.arbeidssituasjon) ? StepId.FRAVÆR_FRA : []),
        StepId.MEDLEMSKAP,
        StepId.OPPSUMMERING,
    ];
};

export const getSøknadStepConfig = (søknadsdata: Søknadsdata): SoknadStepsConfig<StepId> =>
    soknadStepUtils.getStepsConfig(getSøknadSteps(søknadsdata), SoknadApplicationType.SOKNAD, (step) => {
        return getSøknadStepRoute(step);
    });

export const getSøknadStepConfigForStep = (søknadsdata: Søknadsdata, stepId: StepId): StepConfig<StepId> => {
    const config = getSøknadStepConfig(søknadsdata)[stepId];
    if (!config) {
        throw `Missing step config ${stepId}`;
    }
    return config;
};
