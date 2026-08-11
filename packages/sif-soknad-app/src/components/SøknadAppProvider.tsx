import { AppStatusWrapper, SanityConfig } from '@navikt/appstatus-react-ds';
import { ApplicationUnavailableContent, DevBranchInfo } from '@sif/soknad-ui';
import { UxSignalsLoaderProvider } from '@sif/surveys';
import { PropsWithChildren } from 'react';

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
    analyticsConfig?: AnalyticsProviderConfig;
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
    analyticsConfig,
    intlConfig,
    appStatusConfig,
    children,
}: PropsWithChildren<SøknadAppProviderProps>) => {
    return (
        <>
            <AppErrorBoundary>
                <SifQueryClientProvider>
                    <AnalyticsProvider applicationKey={applicationKey} isActive={analyticsConfig?.isActive}>
                        <UxSignalsLoaderProvider>
                            <AppIntlProvider config={intlConfig}>
                                <AppStatusChildren applicationKey={applicationKey} appStatusConfig={appStatusConfig}>
                                    {children}
                                </AppStatusChildren>
                            </AppIntlProvider>
                        </UxSignalsLoaderProvider>
                    </AnalyticsProvider>
                </SifQueryClientProvider>
            </AppErrorBoundary>
            <DevBranchInfo />
        </>
    );
};
