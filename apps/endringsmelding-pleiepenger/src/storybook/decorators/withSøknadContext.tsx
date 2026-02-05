import { StepId } from '../../app/søknad/config/StepId';
import { SøknadContextProvider } from '../../app/søknad/context/SøknadContext';
import { StepFormValuesContextProvider } from '../../app/søknad/context/StepFormValuesContext';
import { SøknadContextState } from '../../app/types/SøknadContextState';
import { TimerEllerProsent } from '../../app/types/TimerEllerProsent';
import { arbeidsgivereMock } from '../data/arbeidsgivereMock';
import { sakMock } from '../data/sakMock';
import { søkerMock } from '../data/søkerMock';

export const initialStateStorybook: SøknadContextState = {
    versjon: '1.0.0',
    søker: søkerMock,
    søknadsdata: {
        id: '123',
    },
    k9saker: [],
    valgteEndringer: {
        arbeidstid: true,
        lovbestemtFerie: true,
        omsorgstilbud: true,
    },
    tillattEndringsperiode: {
        from: new Date(),
        to: new Date(),
    },
    antallSakerFørEndringsperiode: 2,
    søknadSteps: [StepId.UKJENT_ARBEIDSFOHOLD, StepId.LOVBESTEMT_FERIE, StepId.ARBEIDSTID],
    sak: {
        ...sakMock,
    },
    søknadRoute: undefined,
    arbeidsgivere: arbeidsgivereMock,
    inputPreferanser: {
        timerEllerProsent: TimerEllerProsent.PROSENT,
    },
};

export const withSøknadContextProvider = (Story: any, state: Partial<SøknadContextState> = {}) => (
    <SøknadContextProvider initialData={{ ...initialStateStorybook, ...state }}>
        <StepFormValuesContextProvider>
            <Story />
        </StepFormValuesContextProvider>
    </SøknadContextProvider>
);
