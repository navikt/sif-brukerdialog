import * as React from 'react';
import { StepFormValuesContextProvider } from '../../app/søknad/context/StepFormValuesContext';
import { SøknadContextProvider } from '../../app/søknad/context/SøknadContext';
import { SøknadContextState } from '../../app/types/SøknadContextState';
import { TimerEllerProsent } from '../../app/types/TimerEllerProsent';
import { arbeidsgivereMock } from '../data/arbeidsgivereMock';
import { søkerMock } from '../data/søkerMock';

const initialState: SøknadContextState = {
    versjon: '1.0.0',
    søker: søkerMock,
    søknadsdata: {
        id: '123',
    },
    k9saker: [],
    hvaSkalEndres: [],
    tillattEndringsperiode: {
        from: new Date(),
        to: new Date(),
    },
    sak: {} as any,
    søknadRoute: undefined,
    arbeidsgivere: arbeidsgivereMock,
    inputPreferanser: {
        timerEllerProsent: TimerEllerProsent.PROSENT,
    },
};

export const withSøknadContextProvider = (Story: any, state: Partial<SøknadContextState> = {}) => (
    <SøknadContextProvider initialData={{ ...initialState, ...state }}>
        <StepFormValuesContextProvider>
            <Story />
        </StepFormValuesContextProvider>
    </SøknadContextProvider>
);
