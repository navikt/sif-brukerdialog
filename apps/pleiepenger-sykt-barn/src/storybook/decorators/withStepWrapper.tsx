import { BrowserRouter } from 'react-router-dom';
import { AmplitudeProvider } from '@navikt/sif-common-amplitude';
import { SøkerdataContextProvider } from '../../app/context/SøkerdataContext';
import { SøknadsdataContextProvider } from '../../app/søknad/SøknadsdataContext';
import { StoryFormikWrapper } from '../components/StoryFormikWrapper';
import StoryIntlProvider from '../components/StoryIntlProvider';
import { barnMock } from '../data/barnMock';
import { formikValues } from '../data/formikValues';
import { søkerMock } from '../data/søkerMock';
import { søknadsdata } from '../data/søknadsdata';

export const withStepWrapper = (Story: any) => (
    <BrowserRouter>
        <StoryIntlProvider locale="nb">
            <AmplitudeProvider applicationKey={'ab'} isActive={false} apiKey="default">
                <SøkerdataContextProvider value={{ søker: søkerMock, barn: barnMock }}>
                    <StoryFormikWrapper parameters={{ initialValues: formikValues }}>
                        <SøknadsdataContextProvider
                            value={{
                                søknadsdata,
                                setSøknadsdata: () => null,
                            }}>
                            <Story />
                        </SøknadsdataContextProvider>
                    </StoryFormikWrapper>
                </SøkerdataContextProvider>
            </AmplitudeProvider>
        </StoryIntlProvider>
    </BrowserRouter>
);
