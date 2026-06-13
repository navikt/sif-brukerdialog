import { FaroProvider } from '@navikt/sif-common-faro';
import { DevBranchInfo } from '@sif/soknad-ui';
import { PropsWithChildren } from 'react';

import { AppErrorBoundary } from './AppErrorBoundary';
import { SifQueryClientProvider } from './SifQueryClientProvider';

interface SøknadAppProviderProps {
    applicationKey: string;
    appVersion: string;
    isActive?: boolean;
    telemetryCollectorURL?: string;
}

export const SøknadAppProvider = ({
    applicationKey,
    appVersion,
    isActive,
    telemetryCollectorURL,
    children,
}: PropsWithChildren<SøknadAppProviderProps>) => {
    return (
        <FaroProvider
            applicationKey={applicationKey}
            appVersion={appVersion}
            isActive={isActive}
            telemetryCollectorURL={telemetryCollectorURL}>
            <AppErrorBoundary>
                <SifQueryClientProvider>{children}</SifQueryClientProvider>
            </AppErrorBoundary>
            <DevBranchInfo />
        </FaroProvider>
    );
};
