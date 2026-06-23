import { initSentry, SentryConfig } from '@navikt/sif-common-sentry';
import { FaroProvider, FaroProviderConfig } from '@navikt/sif-common-faro';
import { DevBranchInfo } from '@sif/soknad-ui';
import { PropsWithChildren } from 'react';

import { AnalyticsProvider, AnalyticsProviderConfig } from '../analytics/analytics';
import { AppErrorBoundary } from './AppErrorBoundary';
import { SifQueryClientProvider } from './SifQueryClientProvider';
import { AppIntlConfig, AppIntlProvider } from './AppIntlProvider';

interface SøknadAppProviderProps {
    applicationKey: string;
    appVersion: string;
    faroConfig?: FaroProviderConfig;
    analyticsConfig?: AnalyticsProviderConfig;
    sentryConfig?: SentryConfig;
    intlConfig?: AppIntlConfig;
}

let sentryInitialized = false;

export const SøknadAppProvider = ({
    applicationKey,
    appVersion,
    analyticsConfig,
    faroConfig,
    sentryConfig,
    intlConfig,
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
            isActive={faroConfig?.isActive}
            telemetryCollectorURL={faroConfig?.telemetryCollectorURL}>
            <AppErrorBoundary>
                <SifQueryClientProvider>
                    <AnalyticsProvider applicationKey={applicationKey} isActive={analyticsConfig?.isActive}>
                        <AppIntlProvider config={intlConfig}>{children}</AppIntlProvider>
                    </AnalyticsProvider>
                </SifQueryClientProvider>
            </AppErrorBoundary>
            <DevBranchInfo />
        </FaroProvider>
    );
};
