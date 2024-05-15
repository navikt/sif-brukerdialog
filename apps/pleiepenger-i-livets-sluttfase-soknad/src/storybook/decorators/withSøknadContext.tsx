import { StepFormValuesContextProvider } from '../../app/søknad/context/StepFormValuesContext';
import { SøknadContextProvider } from '../../app/søknad/context/SøknadContext';
import { SøknadContextState } from '../../app/types/SøknadContextState';
import { søknadContextMock } from '../data/søknadContextMock';

export const initialStateStorybook: SøknadContextState = {
    ...søknadContextMock,
};

export const withSøknadContextProvider = (Story: any, state: Partial<SøknadContextState> = {}) => (
    <SøknadContextProvider initialData={{ ...initialStateStorybook, ...state }}>
        <StepFormValuesContextProvider>
            <Story />
        </StepFormValuesContextProvider>
    </SøknadContextProvider>
);
