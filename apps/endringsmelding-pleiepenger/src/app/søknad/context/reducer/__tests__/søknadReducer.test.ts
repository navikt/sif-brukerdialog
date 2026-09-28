import { SøknadRoutes } from '@app/søknad/config/SøknadRoutes';
import { StepId } from '@app/søknad/config/StepId';
import { SøknadContextState } from '@app/types';
import { describe, expect, it, vi } from 'vitest';

import actionsCreator from '../../action/actionCreator';
import { søknadReducer } from '../søknadReducer';

vi.mock('@navikt/sif-common-env', () => ({
    getRequiredEnv: () => '',
    getMaybeEnv: () => '',
    getCommonEnv: () => ({}),
    getSifInnsynBrowserEnv: () => ({}),
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
