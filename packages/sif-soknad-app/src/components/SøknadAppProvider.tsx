import { initSentry, SentryConfig } from '@navikt/sif-common-sentry';
import { FaroProvider, FaroProviderConfig } from '@navikt/sif-common-faro';
import { DevBranchInfo } from '@sif/soknad-ui';
import { PropsWithChildren, useRef } from 'react';

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

export const SøknadAppProvider = ({
    applicationKey,
    appVersion,
    analyticsConfig,
    faroConfig,
    sentryConfig,
    intlConfig,
    children,
}: PropsWithChildren<SøknadAppProviderProps>) => {
    // useRef sikrer at Sentry kun initialiseres én gang per provider-instans,
    // uten å lekke state mellom tester eller hot-reload.
    const sentryInitializedRef = useRef(false);
    if (sentryConfig && !sentryInitializedRef.current) {
        initSentry(sentryConfig);
        sentryInitializedRef.current = true;
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
