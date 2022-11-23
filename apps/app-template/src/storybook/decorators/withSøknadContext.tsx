import React from 'react';
import { SøknadContextProvider } from '../../app/søknad/context/SøknadContext';
import { StepFormValuesContextProvider } from '../../app/søknad/context/StepFormValuesContext';
import { SøknadContextState } from '../../app/types/SøknadContextState';
import { SøkerMock } from '../mock-data';

const initialState: SøknadContextState = {
    versjon: '1.0.0',
    søker: SøkerMock,

    søknadsdata: {},
    søknadRoute: undefined,
    søknadSendt: false,
    børMellomlagres: false,
};

export const withSøknadContextProvider = (Story: any, state: Partial<SøknadContextState> = {}) => (
    <SøknadContextProvider initialData={{ ...initialState, ...state }}>
        <StepFormValuesContextProvider>
            <Story />
        </StepFormValuesContextProvider>
    </SøknadContextProvider>
);
