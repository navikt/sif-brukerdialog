import { SoknadApplicationType } from '@navikt/sif-common-soknad/lib/soknad-step/soknadStepTypes';
import soknadStepUtils from '@navikt/sif-common-soknad/lib/soknad-step/soknadStepUtils';

export enum StepID {
    'OM_ANNEN_FORELDER' = 'om-annen-forelder',
    'ANNEN_FORELDER_SITUASJON' = 'annen-forelder-situasjon',
    'DERES_FELLES_BARN' = 'deres-felles-barn',
    'OPPSUMMERING' = 'oppsummering',
}

const SoknadSteps: StepID[] = [
    StepID.OM_ANNEN_FORELDER,
    StepID.ANNEN_FORELDER_SITUASJON,
    StepID.DERES_FELLES_BARN,
    StepID.OPPSUMMERING,
];

export const soknadStepsConfig = soknadStepUtils.getStepsConfig(SoknadSteps, SoknadApplicationType.SOKNAD);
