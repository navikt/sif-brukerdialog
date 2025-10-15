import { SøknadContextProvider } from '../../app/søknad/context/SøknadContext';
import { SøknadContextState } from '../../app/types/SøknadContextState';
import { RegistrerteBarnMock, SøkerMock } from '../mock-data';

export const mockInitialSøknadContextState: SøknadContextState = {
    versjon: '1.0.0',
    søker: SøkerMock,
    registrerteBarn: RegistrerteBarnMock,
    søknadsdata: {},
    søknadRoute: undefined,
    søknadSendt: false,
    børMellomlagres: false,
};

export const withSøknadContextProvider = (Story: any, state: Partial<SøknadContextState> = {}) => (
    <SøknadContextProvider initialState={{ ...mockInitialSøknadContextState, ...state }}>
        <Story />
    </SøknadContextProvider>
);
