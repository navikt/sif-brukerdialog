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

    if (valgteEndringer.lovbestemtFerie) {
        steps.push(StepId.LOVBESTEMT_FERIE);
    }

    if (visArbeidstidSteg) {
        steps.push(StepId.ARBEIDSTID);
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

const harUbesvartArbeidstidForNyttArbeidsforhold = (søknadsdata?: Søknadsdata): boolean => {
    const { ukjentArbeidsforhold, arbeidstid } = søknadsdata || {};
    return (ukjentArbeidsforhold?.arbeidsforhold || []).some(
        (a) => a.erAnsatt === true && !arbeidstid?.arbeidsaktivitet[a.arbeidsgiverKey]?.arbeiderIPerioden,
    );
};

/** Steg som mangler svar bruker må gi før meldingen kan sendes inn */
export const getStegMedManglendeSvar = (søknadsdata?: Søknadsdata): StepId[] =>
    harUbesvartArbeidstidForNyttArbeidsforhold(søknadsdata) ? [StepId.ARBEIDSTID] : [];

/**
 * Har bruker vært på oppsummeringen, sendes hen tilbake dit med mindre det har kommet til
 * nye steg, eller steg med manglende svar, etter gjeldende steg. Da må bruker innom det første av dem først.
 */
export const getNesteSteg = (
    stepId: StepId,
    søknadSteps: StepId[],
    søknadStepsVedOppsummering?: StepId[],
    stegMedManglendeSvar: StepId[] = [],
): StepId | undefined => {
    const etterfølgendeSteg = søknadSteps.slice(søknadSteps.indexOf(stepId) + 1);
    if (!søknadStepsVedOppsummering) {
        return etterfølgendeSteg[0];
    }
    return (
        etterfølgendeSteg.find(
            (steg) => !søknadStepsVedOppsummering.includes(steg) || stegMedManglendeSvar.includes(steg),
        ) ?? StepId.OPPSUMMERING
    );
};
