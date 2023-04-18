import React from 'react';
import { SøknadContextProvider } from '../../app/søknad/context/SøknadContext';
import { StepFormValuesContextProvider } from '../../app/søknad/context/StepFormValuesContext';
import { SøknadContextState } from '../../app/types/SøknadContextState';
import { søkerMock } from '../data/søkerMock';
import { arbeidsgivereMock } from '../data/arbeidsgivereMock';
import { TimerEllerProsent } from '../../app/types/TimerEllerProsent';

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
