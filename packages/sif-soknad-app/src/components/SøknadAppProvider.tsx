import { AppStatusWrapper, SanityConfig } from '@navikt/appstatus-react-ds';
import { ApplicationUnavailableContent, DevBranchInfo } from '@sif/soknad-ui';
import { UxSignalsLoaderProvider } from '@sif/surveys';
import { PropsWithChildren } from 'react';

import { AnalyticsProvider } from '../analytics/analytics';
import { AppErrorBoundary } from './AppErrorBoundary';
import { AppIntlConfig, AppIntlProvider } from './AppIntlProvider';
import { SifQueryClientProvider } from './SifQueryClientProvider';

export type { SanityConfig };

interface AppStatusConfig {
    sanityConfig: SanityConfig;
}

/**
 * Provider-komponent som setter opp standard kontekster for søknadsapplikasjonen med:
 * - analytics (innblikk)
 * - internasjonalisering (i18n)
 * - SifQueryClientProvider (react-query) med feil-logging via @sif/apm
 * - appstatus (sanity)
 * - feilgrensesnitt (error boundary)
 * - UxSignals (laster inn ux signals)
 */
interface SøknadAppProviderProps {
    /** Nøkkel for applikasjonen som brukes til å identifisere appen i
     * ulike kontekster, f.eks. analytics og appstatus */
    applicationKey: string;
    /** Om analytics skal være aktivert. Hvis aktiv wrappes applikasjonen med
     * AnalyticsProvider som setter ioo logging til Navs innblikk  */
    useAnalytics?: boolean;
    /** Konfigurasjon for internasjonalisering (i18n) */
    intlConfig?: AppIntlConfig;
    /** Konfigurasjon for appstatus - sif's sanity løsning for å skru av og på applikasjoner som er ei produksjon */
    appStatusConfig?: AppStatusConfig;
}

export const SøknadAppProvider = ({
    applicationKey,
    useAnalytics,
    intlConfig,
    appStatusConfig,
    children,
}: PropsWithChildren<SøknadAppProviderProps>) => {
    return (
        <AppErrorBoundary>
            <SifQueryClientProvider>
                <AnalyticsProvider applicationKey={applicationKey} isActive={useAnalytics}>
                    <UxSignalsLoaderProvider>
                        <AppIntlProvider config={intlConfig}>
                            {appStatusConfig ? (
                                <AppStatusWrapper
                                    applicationKey={applicationKey}
                                    sanityConfig={appStatusConfig.sanityConfig}
                                    contentRenderer={() => children}
                                    unavailableContentRenderer={() => <ApplicationUnavailableContent />}
                                />
                            ) : (
                                <>{children}</>
                            )}
                        </AppIntlProvider>
                    </UxSignalsLoaderProvider>
                </AnalyticsProvider>
            </SifQueryClientProvider>
            <DevBranchInfo />
        </AppErrorBoundary>
    );
};
