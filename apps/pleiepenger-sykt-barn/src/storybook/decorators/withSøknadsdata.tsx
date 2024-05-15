import { SøknadsdataContextProvider } from '../../app/søknad/SøknadsdataContext';
import { søknadsdata } from '../data/søknadsdata';

export const withSøknadsdata = (Story: any) => (
    <SøknadsdataContextProvider
        value={{
            søknadsdata,
            setSøknadsdata: () => null,
        }}>
        <Story />
    </SøknadsdataContextProvider>
);
