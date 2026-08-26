import { Theme } from '@navikt/ds-react';
import { mockRegistrerteBarn, mockSøker } from '@sif/api/mock-data';
import { HarKontonummerEnum } from '@sif/api/ung-deltaker';
import {
    createSøknadAppStore,
    SifQueryClientProvider,
    SøknadAppContext,
    SøknadStepFormProvider,
} from '@sif/soknad-app';
import { useRef } from 'react';

import { AppContextData, AppContextProvider } from '../../src/app/context/AppContext';
import { søknadStepConfig, søknadStepOrder } from '../../src/app/setup/soknadStepConfig';
import { MELLOMLAGRING_VERSJON } from '../../src/app/setup/constants';
import { applicationIntlMessages } from '../../src/app/i18n';

const defaultAppContextData: AppContextData = {
    søker: mockSøker,
    registrerteBarn: mockRegistrerteBarn,
    kontoInfo: { harKontonummer: HarKontonummerEnum.JA, kontonummerFraRegister: '12345678901' },
};

interface Props {
    children: React.ReactNode;
    appContextOverrides?: Partial<AppContextData>;
}

const SøknadContextWrapper = ({ children, appContextOverrides }: Props) => {
    const storeRef = useRef(
        createSøknadAppStore({ config: søknadStepConfig, stepOrder: søknadStepOrder }),
    );

    // Initialiser uten mellomlagring — viser første steg, ingen redirect
    storeRef.current.getState().init(null);

    const contextValue = {
        store: storeRef.current,
        config: søknadStepConfig,
        stepOrder: søknadStepOrder,
        versjon: MELLOMLAGRING_VERSJON,
        basePath: '/soknad',
        applicationTitle: applicationIntlMessages.nb['application.title'] as string,
        resumeLaterUrl: 'https://www.nav.no/minside',
        lagreMellomlagring: async () => {},
        slettMellomlagring: async () => {},
    };

    return (
        <Theme>
            <SifQueryClientProvider>
                <SøknadAppContext.Provider value={contextValue}>
                    <SøknadStepFormProvider>
                        <AppContextProvider value={{ ...defaultAppContextData, ...appContextOverrides }}>
                            {children}
                        </AppContextProvider>
                    </SøknadStepFormProvider>
                </SøknadAppContext.Provider>
            </SifQueryClientProvider>
        </Theme>
    );
};

export const withSøknadAppContext = (Story: any, appContextOverrides?: Partial<AppContextData>) => (
    <SøknadContextWrapper appContextOverrides={appContextOverrides}>
        <Story />
    </SøknadContextWrapper>
);
