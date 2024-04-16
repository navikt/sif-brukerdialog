import { SanityConfig } from '@navikt/appstatus-react-ds/src/types';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';
import '@formatjs/intl-pluralrules/locale-data/nb';
import '@formatjs/intl-pluralrules/locale-data/nn';
import '@formatjs/intl-pluralrules/polyfill';
import AppStatusWrapper from '@navikt/sif-common-core-ds/src/components/app-status-wrapper/AppStatusWrapper';
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
import useDecoratorLanguageSelector from '../hooks/useDecoratorLanguageSelector';
import ErrorPage from '../pages/error-page/ErrorPage';
import SoknadErrorMessages from '../components/soknad-error-messages/SoknadErrorMessages';
import DevBranchInfo from '../components/dev-branch-info/DevBranchInfo';

interface AppStatus {
    applicationKey: string;
    sanityConfig: SanityConfig;
}
interface Props {
    /** App name - not visual to user */
    appName: string;
    /** Locale messages */
    intlMessages: MessageFileFormat;
    /** Key used in sentry logging for identifying the app in the logs */
    sentryKey?: string;
    /** Key used in sentry logging for identifying the app in the logs */
    sentryIgnoreErrors?: Array<string | RegExp>;
    /** Config for connecting to the appStatus sanity project */
    appStatus?: AppStatus;
    /** The content */
    children: React.ReactNode;
    /** Public path */
    publicPath: string;
}

const localeFromSessionStorage = getLocaleFromSessionStorage();
dayjs.locale(localeFromSessionStorage);

const isValidAppStatus = (appStatus: AppStatus | any): appStatus is AppStatus =>
    appStatus !== undefined &&
    appStatus.sanityConfig?.dataset !== undefined &&
    appStatus.sanityConfig?.projectId !== undefined;

const SoknadApplication = ({ intlMessages: messages, appStatus, publicPath, children }: Props) => {
    const [locale, setLocale] = React.useState<Locale>(localeFromSessionStorage);
    const localeMessages = messages[locale] || messages['nb'];
    const locales = Object.keys(messages) as any;

    useDecoratorLanguageSelector([locales], (locale: any) => {
        setLocaleInSessionStorage(locale);
        setLocale(locale);
    });

    return (
        <IntlProvider locale={locale === 'nb' ? getBokmålLocale() : getNynorskLocale()} messages={localeMessages}>
            <BrowserRouter basename={publicPath}>
                <>
                    {isValidAppStatus(appStatus) ? (
                        <AppStatusWrapper
                            applicationKey={appStatus.applicationKey}
                            sanityConfig={appStatus.sanityConfig}
                            contentRenderer={() => <>{children}</>}
                            unavailableContentRenderer={() => (
                                <ErrorPage contentRenderer={() => <SoknadErrorMessages.ApplicationUnavailable />} />
                            )}
                        />
                    ) : (
                        children
                    )}
                    <DevBranchInfo />
                </>
            </BrowserRouter>
        </IntlProvider>
    );
};
export default SoknadApplication;
