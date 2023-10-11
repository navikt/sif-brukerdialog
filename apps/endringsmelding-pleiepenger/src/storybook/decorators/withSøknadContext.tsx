import * as React from 'react';
import { StepId } from '../../app/søknad/config/StepId';
import { StepFormValuesContextProvider } from '../../app/søknad/context/StepFormValuesContext';
import { SøknadContextProvider } from '../../app/søknad/context/SøknadContext';
import { SøknadContextState } from '../../app/types/SøknadContextState';
import { TimerEllerProsent } from '../../app/types/TimerEllerProsent';
import { arbeidsgivereMock } from '../data/arbeidsgivereMock';
import { søkerMock } from '../data/søkerMock';

const initialState: SøknadContextState = {
    versjon: '1.0.0',
    søker: søkerMock,
    søknadSteps: [StepId.LOVBESTEMT_FERIE],
    søknadsdata: {
        id: '123',
    },
    k9saker: [],
    antallSakerFørEndringsperiode: 0,
    valgteEndringer: {
        arbeidstid: false,
        lovbestemtFerie: true,
    },
    tillattEndringsperiode: {
        from: new Date(),
        to: new Date(),
    },
    sak: {
        arbeidsaktivitetMedUkjentArbeidsgiver: [],
    } as any,
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
