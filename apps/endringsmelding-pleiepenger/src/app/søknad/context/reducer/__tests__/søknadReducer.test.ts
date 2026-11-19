import { SøknadRoutes } from '@app/søknad/config/SøknadRoutes';
import { getNesteSteg } from '@app/søknad/config/søknadStepConfig';
import { StepId } from '@app/søknad/config/StepId';
import { SøknadContextState } from '@app/types';
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
