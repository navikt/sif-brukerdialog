import '@navikt/ds-css';

import { BodyLong, Heading, VStack } from '@navikt/ds-react';
import { FaroProvider } from '@navikt/sif-common-faro';
import { BrowserRouter } from 'react-router-dom';

import { getAppEnv } from './app/setup/env/appEnv';

const appEnv = getAppEnv();

export const App = () => {
    return (
        <FaroProvider
            applicationKey="aktivitetspenger-soknad"
            appVersion={appEnv.APP_VERSION}
            isActive={appEnv.SIF_PUBLIC_USE_FARO === 'true'}>
            <BrowserRouter basename="/aktivitetspenger-soknad">
                <main className="p-6 md:p-10">
                    <VStack gap="space-4">
                        <Heading size="large" level="1">
                            Aktivitetspenger soknad
                        </Heading>
                        <BodyLong>Bootstrap er klar. Neste steg er implementasjon av soknadsflyt.</BodyLong>
                    </VStack>
                </main>
            </BrowserRouter>
        </FaroProvider>
    );
};
