import { Arbeidsforhold, Søknadsdata, ValgteEndringer } from '@app/types';
import { harEndretArbeidstid, harFjernetLovbestemtFerie } from '@app/utils';
import { SoknadApplicationType, SoknadStepsConfig, soknadStepUtils } from '@navikt/sif-common-soknad-ds';

import { getSøknadStepRoute } from './SøknadRoutes';
import { StepId } from './StepId';

const erAnsattIUkjentArbeidsforhold = (arbeidsforhold: Arbeidsforhold[] = []): boolean => {
    return arbeidsforhold.some((a) => a.erAnsatt === true);
};

const skalViseArbeidstid = (valgteEndringer: ValgteEndringer, søknadsdata?: Søknadsdata): boolean => {
    const { lovbestemtFerie, arbeidstid, ukjentArbeidsforhold } = søknadsdata || {};
    return (
        valgteEndringer.arbeidstid === true ||
        harFjernetLovbestemtFerie(lovbestemtFerie) ||
        harEndretArbeidstid(arbeidstid) ||
        erAnsattIUkjentArbeidsforhold(ukjentArbeidsforhold?.arbeidsforhold)
    );
};

export const getSøknadSteps = (
    valgteEndringer: ValgteEndringer,
    harArbeidsgivereIkkeISak: boolean,
    søknadsdata?: Søknadsdata,
): StepId[] => {
    const steps: StepId[] = [];

    const visArbeidstidSteg = skalViseArbeidstid(valgteEndringer, søknadsdata);

    if (harArbeidsgivereIkkeISak) {
        steps.push(StepId.UKJENT_ARBEIDSFOHOLD);
    }

    if (visArbeidstidSteg) {
        steps.push(StepId.ARBEIDSTID);
    }

    if (valgteEndringer.lovbestemtFerie) {
        steps.push(StepId.LOVBESTEMT_FERIE);
    }

    if (valgteEndringer.tilsynsordning) {
        steps.push(StepId.TILSYNSORDNING);
    }

    steps.push(StepId.OPPSUMMERING);
    return steps;
};

export const getSøknadStepConfig = (søknadSteps: StepId[]): SoknadStepsConfig<StepId> =>
    soknadStepUtils.getStepsConfig(søknadSteps, SoknadApplicationType.MELDING, (stepId: StepId) =>
        getSøknadStepRoute(stepId),
    );
