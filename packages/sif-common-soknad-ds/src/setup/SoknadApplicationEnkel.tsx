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
import dayjs from 'dayjs';
import 'dayjs/locale/nb';
import 'dayjs/locale/nn';
import DevBranchInfo from '../components/dev-branch-info/DevBranchInfo';
import ErrorBoundary from '../components/errorBoundary/ErrorBoundary';
import SoknadErrorMessages from '../components/soknad-error-messages/SoknadErrorMessages';
import useDecoratorLanguageSelector from '../hooks/useDecoratorLanguageSelector';
import ErrorPage from '../pages/error-page/ErrorPage';

interface Props {
    /** Key used in amplitude and sentry logs */
    appKey: string;
    /** App name - not visual to user */
    appName: string;
    /** Locale messages */
    intlMessages: MessageFileFormat;
    /** Key used in sentry logging for identifying the app in the logs */
    sentryIgnoreErrors?: Array<string | RegExp>;
    /** Config for connecting to the appStatus sanity project */
    appStatus: {
        sanityConfig: SanityConfig;
    };
    /** The content */
    children: React.ReactNode;
    /** Public path used in BrowserRouter */
    publicPath: string;
}

const localeFromSessionStorage = getLocaleFromSessionStorage();
dayjs.locale(localeFromSessionStorage);

const SoknadApplicationEnkel = ({ intlMessages, appStatus, publicPath, appKey, children }: Props) => {
    const [locale, setLocale] = React.useState<Locale>(localeFromSessionStorage);
    const localeMessages = intlMessages[locale] || intlMessages['nb'];
    const locales = Object.keys(intlMessages) as any;

    useDecoratorLanguageSelector([locales], (locale: any) => {
        setLocaleInSessionStorage(locale);
        setLocale(locale);
    });

    return (
        <SifAppWrapper>
            <ErrorBoundary appKey={appKey}>
                <AmplitudeProvider applicationKey={appKey} isActive={true}>
                    <IntlProvider
                        locale={locale === 'nb' ? getBokmålLocale() : getNynorskLocale()}
                        messages={localeMessages}>
                        <BrowserRouter basename={publicPath}>
                            <AppStatusWrapper
                                applicationKey={appKey}
                                sanityConfig={appStatus.sanityConfig}
                                contentRenderer={() => <>{children}</>}
                                unavailableContentRenderer={() => (
                                    <ErrorPage contentRenderer={() => <SoknadErrorMessages.ApplicationUnavailable />} />
                                )}
                            />
                            <DevBranchInfo />
                        </BrowserRouter>
                    </IntlProvider>
                </AmplitudeProvider>
            </ErrorBoundary>
        </SifAppWrapper>
    );
};
export default SoknadApplicationEnkel;
