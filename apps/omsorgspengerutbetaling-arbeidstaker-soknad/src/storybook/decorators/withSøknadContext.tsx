import * as React from 'react';
import { SøknadContextProvider } from '../../app/søknad/context/SøknadContext';
import { SøknadContextState } from '../../app/types/SøknadContextState';
import { registrerteBarnMock, søkerStorybookMock } from '../mock-data';

export const mockInitialSøknadContextState: SøknadContextState = {
    versjon: '1.0.0',
    søker: søkerStorybookMock,
    søknadsdata: {
        id: '1',
    },
    registrerteBarn: registrerteBarnMock,
    søknadRoute: undefined,
    søknadSendt: false,
    børMellomlagres: false,
};

export const withSøknadContextProvider = (Story: any, state: Partial<SøknadContextState> = {}) => (
    <SøknadContextProvider initialData={{ ...mockInitialSøknadContextState, ...state }}>
        <Story />
    </SøknadContextProvider>
);
