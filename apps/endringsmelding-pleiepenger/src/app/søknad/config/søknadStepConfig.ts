import { SoknadApplicationType, SoknadStepsConfig, soknadStepUtils } from '@navikt/sif-common-soknad-ds';
import { Arbeidsforhold, Søknadsdata, ValgteEndringer } from '@types';
import { harEndretArbeidstid, harFjernetLovbestemtFerie } from '@utils';

import { getSøknadStepRoute } from './SøknadRoutes';
import { StepId } from './StepId';

const erAnsattIUkjentArbeidsforhold = (arbeidsforhold: Arbeidsforhold[] = []): boolean => {
    return arbeidsforhold.some((a) => a.erAnsatt === true);
};

export const getSøknadSteps = (
    valgteEndringer: ValgteEndringer,
    harArbeidsgivereIkkeISak: boolean,
    søknadsdata?: Søknadsdata,
): StepId[] => {
    const steps: StepId[] = [];

    if (harArbeidsgivereIkkeISak) {
        steps.push(StepId.UKJENT_ARBEIDSFOHOLD);
    }

    if (valgteEndringer.lovbestemtFerie) {
        steps.push(StepId.LOVBESTEMT_FERIE);
    }

    const { lovbestemtFerie, arbeidstid, ukjentArbeidsforhold } = søknadsdata || {};

    if (
        valgteEndringer.arbeidstid === true ||
        harFjernetLovbestemtFerie(lovbestemtFerie) ||
        harEndretArbeidstid(arbeidstid) ||
        erAnsattIUkjentArbeidsforhold(ukjentArbeidsforhold?.arbeidsforhold)
    ) {
        steps.push(StepId.ARBEIDSTID);
    }

    if (valgteEndringer.omsorgstilbud) {
        steps.push(StepId.OMSORGSTILBUD);
    }

    steps.push(StepId.OPPSUMMERING);
    return steps;
};

export const getSøknadStepConfig = (søknadSteps: StepId[]): SoknadStepsConfig<StepId> =>
    soknadStepUtils.getStepsConfig(søknadSteps, SoknadApplicationType.MELDING, (stepId: StepId) =>
        getSøknadStepRoute(stepId),
    );
