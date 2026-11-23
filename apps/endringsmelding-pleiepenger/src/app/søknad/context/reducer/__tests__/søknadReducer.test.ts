import { getSubmitResult } from '@app/hooks/useOnValidSubmit';
import { SøknadRoutes } from '@app/søknad/config/SøknadRoutes';
import { getNesteSteg, getStegMedManglendeSvar } from '@app/søknad/config/søknadStepConfig';
import { StepId } from '@app/søknad/config/StepId';
import { ArbeiderIPeriodenSvar, SøknadContextState } from '@app/types';
import { describe, expect, it, vi } from 'vitest';

import actionsCreator from '../../action/actionCreator';
import { søknadReducer } from '../søknadReducer';

vi.mock('@sif/env', () => ({
    getRequiredEnv: () => '',
    getMaybeEnv: () => '',
    getCommonEnv: () => ({}),
    getSifInnsynBrowserEnv: () => ({}),
    getK9SakInnsynEnv: () => ({}),
}));

const getState = (): SøknadContextState =>
    ({
        søknadsdata: { id: '1' },
        sak: { harArbeidsgivereIkkeISak: false },
        valgteEndringer: { arbeidstid: false, lovbestemtFerie: true, tilsynsordning: false },
        søknadSteps: [StepId.LOVBESTEMT_FERIE, StepId.OPPSUMMERING],
        søknadRoute: SøknadRoutes.OPPSUMMERING,
    }) as any;

describe('søknadReducer - LEGG_TIL_VALGT_ENDRING', () => {
    it('legger til valgt endring, steg og route uten å fjerne tidligere valg', () => {
        const state = søknadReducer(getState(), actionsCreator.leggTilValgtEndring(StepId.TILSYNSORDNING));

        expect(state.valgteEndringer).toEqual({ arbeidstid: false, lovbestemtFerie: true, tilsynsordning: true });
        expect(state.søknadSteps).toEqual([StepId.LOVBESTEMT_FERIE, StepId.TILSYNSORDNING, StepId.OPPSUMMERING]);
        expect(state.søknadRoute).toEqual(SøknadRoutes.TILSYNSORDNING);
    });
});

describe('søknadReducer - SET_OPPSUMMERING_VIST', () => {
    it('husker stegene da oppsummeringen ble vist, og glemmer dem ved reset', () => {
        const state = søknadReducer(getState(), actionsCreator.setOppsummeringVist());
        expect(state.søknadStepsVedOppsummering).toEqual([StepId.LOVBESTEMT_FERIE, StepId.OPPSUMMERING]);

        const resetState = søknadReducer(state, actionsCreator.resetSøknad());
        expect(resetState.søknadStepsVedOppsummering).toBeUndefined();
    });
});

describe('getSubmitResult', () => {
    it('lagrer arbeidstid som neste route når ukjent arbeidsforhold endres fra nei til ja fra oppsummeringen', () => {
        const state = {
            ...getState(),
            sak: { harArbeidsgivereIkkeISak: true },
            valgteEndringer: { arbeidstid: false, lovbestemtFerie: false, tilsynsordning: false },
            søknadsdata: {
                id: '1',
                ukjentArbeidsforhold: { arbeidsforhold: [{ arbeidsgiverKey: 'a1', erAnsatt: false }] },
            },
            søknadSteps: [StepId.UKJENT_ARBEIDSFOHOLD, StepId.OPPSUMMERING],
            søknadStepsVedOppsummering: [StepId.UKJENT_ARBEIDSFOHOLD, StepId.OPPSUMMERING],
        } as SøknadContextState;

        const result = getSubmitResult(
            state,
            [
                actionsCreator.setSøknadUkjentArbeidsforhold({
                    arbeidsforhold: [
                        {
                            arbeidsgiverKey: 'a1',
                            erAnsatt: true,
                            normalarbeidstid: { timerPerUke: { hours: '37', minutes: '30' } },
                        },
                    ],
                }),
            ],
            StepId.UKJENT_ARBEIDSFOHOLD,
        );

        expect(result.nextStep).toBe(StepId.ARBEIDSTID);
        expect(result.state.søknadRoute).toBe(SøknadRoutes.ARBEIDSTID);
    });
});

describe('getNesteSteg', () => {
    const steg = [StepId.LOVBESTEMT_FERIE, StepId.ARBEIDSTID, StepId.TILSYNSORDNING, StepId.OPPSUMMERING];

    it('går til neste steg når bruker ikke har vært på oppsummeringen', () => {
        expect(getNesteSteg(StepId.LOVBESTEMT_FERIE, steg)).toEqual(StepId.ARBEIDSTID);
    });

    it('går til oppsummeringen når bruker har vært der og ingen nye steg har kommet til', () => {
        expect(getNesteSteg(StepId.LOVBESTEMT_FERIE, steg, steg)).toEqual(StepId.OPPSUMMERING);
    });

    it('går til nytt steg som har kommet til etter at bruker var på oppsummeringen', () => {
        const stegVedOppsummering = [StepId.LOVBESTEMT_FERIE, StepId.TILSYNSORDNING, StepId.OPPSUMMERING];
        expect(getNesteSteg(StepId.LOVBESTEMT_FERIE, steg, stegVedOppsummering)).toEqual(StepId.ARBEIDSTID);
    });
});

describe('getStegMedManglendeSvar', () => {
    const ukjentArbeidsforhold = { arbeidsforhold: [{ arbeidsgiverKey: 'a1', erAnsatt: true }] };

    it('krever arbeidstid når nytt arbeidsforhold er ansatt uten svar på arbeid i perioden', () => {
        const søknadsdata = { ukjentArbeidsforhold, arbeidstid: { arbeidsaktivitet: {} } } as any;
        const stegMedManglendeSvar = getStegMedManglendeSvar(søknadsdata);
        const steg = [StepId.UKJENT_ARBEIDSFOHOLD, StepId.ARBEIDSTID, StepId.OPPSUMMERING];

        expect(getNesteSteg(StepId.UKJENT_ARBEIDSFOHOLD, steg, steg, stegMedManglendeSvar)).toEqual(
            StepId.ARBEIDSTID,
        );
    });

    it('krever ingen steg når arbeid i perioden er besvart', () => {
        const søknadsdata = {
            ukjentArbeidsforhold,
            arbeidstid: { arbeidsaktivitet: { a1: { arbeiderIPerioden: ArbeiderIPeriodenSvar.somVanlig } } },
        } as any;
        expect(getStegMedManglendeSvar(søknadsdata)).toEqual([]);
    });
});
