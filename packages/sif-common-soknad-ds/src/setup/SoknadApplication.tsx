import { SanityConfig } from '@navikt/appstatus-react-ds/src/types';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';
import '@formatjs/intl-pluralrules/locale-data/nb';
import '@formatjs/intl-pluralrules/locale-data/nn';
import '@formatjs/intl-pluralrules/polyfill';
import { AmplitudeProvider } from '@navikt/sif-common-amplitude';
import AppStatusWrapper from '@navikt/sif-common-core-ds/src/components/app-status-wrapper/AppStatusWrapper';
import SifAppWrapper from '@navikt/sif-common-core-ds/src/components/sif-app-wrapper/SifAppWrapper';
import { Locale } from '@navikt/sif-common-core-ds/src/types/Locale';
import { MessageFileFormat } from '@navikt/sif-common-core-ds/src/types/MessageFileFormat';
import {
    getBokmålLocale,
    getLocaleFromSessionStorage,
    getNynorskLocale,
    setLocaleInSessionStorage,
} from '@navikt/sif-common-core-ds/src/utils/localeUtils';
import { FaroProvider } from '@navikt/sif-common-faro';
import dayjs from 'dayjs';
import 'dayjs/locale/nb';
import 'dayjs/locale/nn';
import DevBranchInfo from '../components/dev-branch-info/DevBranchInfo';
import ErrorBoundary from '../components/errorBoundary/ErrorBoundary';
import SoknadErrorMessages from '../components/soknad-error-messages/SoknadErrorMessages';
import useDecoratorLanguageSelector from '../hooks/useDecoratorLanguageSelector';
import ErrorPage from '../pages/error-page/ErrorPage';

interface Props {
    appVersion: string;
    /** Key used in amplitude and sentry logs */
    appKey: string;
    /** App name - not visual to user */
    appName: string;
    /** App title - visaul to user*/
    appTitle: string;
    /** Public path used in BrowserRouter */
    publicPath: string;
    /** Locale messages */
    intlMessages: MessageFileFormat;
    /** Toggle on/off languageselector in decorator */
    useLanguageSelector?: boolean;
    /** If amplitude logging is active or not*/
    useAmplitude: boolean;
    /** Amplitude project api key */
    amplitudeApiKey: string;
    /** Faro logging */
    useFaro?: boolean;
    naisFrontendTelemetryCollectorUrl?: string;
    /** Config for connecting to the appStatus sanity project */
    appStatus: {
        sanityConfig: SanityConfig;
    };
    /** The content */
    children: React.ReactNode;
    /** Extra content in ErrorBoundary */
    onResetSoknad?: () => void;
}

const localeFromSessionStorage = getLocaleFromSessionStorage();
dayjs.locale(localeFromSessionStorage);

const SoknadApplication = ({
    intlMessages,
    appStatus,
    publicPath,
    appKey,
    useAmplitude,
    amplitudeApiKey,
    useLanguageSelector,
    children,
    appTitle,
    appVersion,
    naisFrontendTelemetryCollectorUrl,
    useFaro,
    onResetSoknad,
}: Props) => {
    const [locale, setLocale] = React.useState<Locale>(localeFromSessionStorage);
    const localeMessages = intlMessages[locale] || intlMessages['nb'];
    const locales = useLanguageSelector ? (Object.keys(intlMessages) as any) : [];

    useDecoratorLanguageSelector(locales, (decoratorLocale: any) => {
        setLocaleInSessionStorage(decoratorLocale);
        setLocale(decoratorLocale);
    });

    return (
        <SifAppWrapper>
            <FaroProvider
                applicationKey={appKey}
                telemetryCollectorURL={naisFrontendTelemetryCollectorUrl}
                appVersion={appVersion}
                isActive={useFaro}>
                <ErrorBoundary appKey={appKey} onResetSoknad={onResetSoknad} appTitle={appTitle}>
                    <AmplitudeProvider apiKey={amplitudeApiKey} applicationKey={appKey} isActive={useAmplitude}>
                        <IntlProvider
                            locale={locale === 'nb' ? getBokmålLocale() : getNynorskLocale()}
                            messages={localeMessages}>
                            <BrowserRouter basename={publicPath}>
                                {/* Staging-datasettet er slettet på grunn av økonomi */}
                                {appStatus.sanityConfig.dataset === 'staging' ? (
                                    children
                                ) : (
                                    <AppStatusWrapper
                                        applicationKey={appKey}
                                        sanityConfig={appStatus.sanityConfig}
                                        contentRenderer={() => <>{children}</>}
                                        unavailableContentRenderer={() => (
                                            <ErrorPage
                                                contentRenderer={() => <SoknadErrorMessages.ApplicationUnavailable />}
                                            />
                                        )}
                                    />
                                )}
                                <DevBranchInfo />
                            </BrowserRouter>
                        </IntlProvider>
                    </AmplitudeProvider>
                </ErrorBoundary>
            </FaroProvider>
        </SifAppWrapper>
    );
};
export default SoknadApplication;
