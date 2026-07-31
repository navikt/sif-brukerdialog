import { AppStatusWrapper, SanityConfig } from '@navikt/appstatus-react-ds';
import { FaroProvider, FaroProviderConfig } from '@navikt/sif-common-faro';
import { initSentry, SentryConfig } from '@navikt/sif-common-sentry';
import { ApplicationUnavailableContent, DevBranchInfo } from '@sif/soknad-ui';
import { PropsWithChildren, useRef } from 'react';

import { AnalyticsProvider, AnalyticsProviderConfig } from '../analytics/analytics';
import { AppIntlConfig, AppIntlProvider } from './AppIntlProvider';
import { AppErrorBoundary } from './AppErrorBoundary';
import { SifQueryClientProvider } from './SifQueryClientProvider';

export type { SanityConfig };

export interface AppStatusConfig {
    sanityConfig: SanityConfig;
}

interface SøknadAppProviderProps {
    applicationKey: string;
    appVersion: string;
    faroConfig?: FaroProviderConfig;
    analyticsConfig?: AnalyticsProviderConfig;
    sentryConfig?: SentryConfig;
    intlConfig?: AppIntlConfig;
    appStatusConfig?: AppStatusConfig;
}

const AppStatusChildren = ({
    applicationKey,
    appStatusConfig,
    children,
}: PropsWithChildren<{ applicationKey: string; appStatusConfig?: AppStatusConfig }>) => {
    if (!appStatusConfig) {
        return <>{children}</>;
    }
    return (
        <AppStatusWrapper
            applicationKey={applicationKey}
            sanityConfig={appStatusConfig.sanityConfig}
            contentRenderer={() => children}
            unavailableContentRenderer={() => <ApplicationUnavailableContent />}
        />
    );
};

export const SøknadAppProvider = ({
    applicationKey,
    appVersion,
    analyticsConfig,
    faroConfig,
    sentryConfig,
    intlConfig,
    appStatusConfig,
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
                        <AppIntlProvider config={intlConfig}>
                            <AppStatusChildren applicationKey={applicationKey} appStatusConfig={appStatusConfig}>
                                {children}
                            </AppStatusChildren>
                        </AppIntlProvider>
                    </AnalyticsProvider>
                </SifQueryClientProvider>
            </AppErrorBoundary>
            <DevBranchInfo />
        </FaroProvider>
    );
};
