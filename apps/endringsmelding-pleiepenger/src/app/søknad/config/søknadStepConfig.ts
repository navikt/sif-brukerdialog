import { SoknadApplicationType, SoknadStepsConfig, soknadStepUtils } from '@navikt/sif-common-soknad-ds';
import { Arbeidsforhold, Søknadsdata } from '@types';
import { harFjernetLovbestemtFerie } from '@utils';
import { StepId } from './StepId';
import { getSøknadStepRoute } from './SøknadRoutes';
import { ValgteEndringer } from '../../types/ValgteEndringer';

const erAnsattIUkjentArbeidsforhold = (arbeidsforhold: Arbeidsforhold[] = []): boolean => {
    return arbeidsforhold.some((a) => a.erAnsatt === true);
};

export const getSøknadSteps = (
    valgteEndringer: ValgteEndringer,
    harUkjentArbeidsforhold: boolean,
    søknadsdata?: Søknadsdata
): StepId[] => {
    const steps: StepId[] = [];

    if (harUkjentArbeidsforhold) {
        steps.push(StepId.UKJENT_ARBEIDSFOHOLD);
    }

    if (valgteEndringer.lovbestemtFerie) {
        steps.push(StepId.LOVBESTEMT_FERIE);
    }

    if (
        valgteEndringer.arbeidstid ||
        harFjernetLovbestemtFerie(søknadsdata?.lovbestemtFerie) ||
        erAnsattIUkjentArbeidsforhold(søknadsdata?.ukjentArbeidsforhold?.arbeidsforhold)
    ) {
        steps.push(StepId.ARBEIDSTID);
    }
    steps.push(StepId.OPPSUMMERING);
    return steps;
};

export const getSøknadStepConfig = (søknadSteps: StepId[]): SoknadStepsConfig<StepId> =>
    soknadStepUtils.getStepsConfig(søknadSteps, SoknadApplicationType.MELDING, (stepId: StepId) =>
        getSøknadStepRoute(stepId)
    );
