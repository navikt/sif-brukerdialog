import { initSentry, SentryConfig } from '@navikt/sif-common-sentry';
import { FaroProvider } from '@navikt/sif-common-faro';
import { DevBranchInfo } from '@sif/soknad-ui';
import { PropsWithChildren } from 'react';

import { AnalyticsProvider } from '../analytics/analytics';
import { AppErrorBoundary } from './AppErrorBoundary';
import { SifQueryClientProvider } from './SifQueryClientProvider';

interface SøknadAppProviderProps {
    applicationKey: string;
    appVersion: string;
    isActive?: boolean;
    telemetryCollectorURL?: string;
    sentryConfig?: SentryConfig;
}

let sentryInitialized = false;

export const SøknadAppProvider = ({
    applicationKey,
    appVersion,
    isActive,
    telemetryCollectorURL,
    sentryConfig,
    children,
}: PropsWithChildren<SøknadAppProviderProps>) => {
    if (sentryConfig && !sentryInitialized) {
        initSentry(sentryConfig);
        sentryInitialized = true;
    }

    return (
        <FaroProvider
            applicationKey={applicationKey}
            appVersion={appVersion}
            isActive={isActive}
            telemetryCollectorURL={telemetryCollectorURL}>
            <AppErrorBoundary>
                <SifQueryClientProvider>
                    <AnalyticsProvider applicationKey={applicationKey} isActive={isActive}>
                        {children}
                    </AnalyticsProvider>
                </SifQueryClientProvider>
            </AppErrorBoundary>
            <DevBranchInfo />
        </FaroProvider>
    );
};
