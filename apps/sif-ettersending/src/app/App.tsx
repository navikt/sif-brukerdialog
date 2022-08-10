import { Modal } from '@navikt/ds-react';
import * as React from 'react';
import { render } from 'react-dom';
import { AmplitudeProvider } from '@navikt/sif-common-amplitude';
import AppStatusWrapper from '@navikt/sif-common-core-ds/lib/components/app-status-wrapper/AppStatusWrapper';
import SifAppWrapper from '@navikt/sif-common-core-ds/lib/components/sif-app-wrapper/SifAppWrapper';
import { getEnvironmentVariable } from '@navikt/sif-common-core-ds/lib/utils/envUtils';
import { Locale } from '@navikt/sif-common-core-ds/lib/types/Locale';
import ApplicationWrapper from './components/application-wrapper/ApplicationWrapper';
import UnavailablePage from './components/pages/unavailable-page/UnavailablePage';
import appSentryLogger from './utils/appSentryLogger';
import { getLocaleFromSessionStorage, setLocaleInSessionStorage } from './utils/localeUtils';
import YtelseSwitch from './YtelseSwitch';
import '@navikt/ds-css';
import '@navikt/sif-common-core-ds/lib/styles/sif-ds-theme.css';
import './app.css';

export const APPLICATION_KEY = 'ettersending';

appSentryLogger.init();

const localeFromSessionStorage = getLocaleFromSessionStorage();

const getAppStatusSanityConfig = () => {
    const projectId = getEnvironmentVariable('APPSTATUS_PROJECT_ID');
    const dataset = getEnvironmentVariable('APPSTATUS_DATASET');
    return !projectId || !dataset ? undefined : { projectId, dataset };
};

const App = () => {
    const [locale, setLocale] = React.useState<Locale>(localeFromSessionStorage);
    const appStatusSanityConfig = getAppStatusSanityConfig();

    React.useEffect(() => {
        if (Modal.setAppElement) {
            Modal.setAppElement('#app');
        }
    });
    return (
        <SifAppWrapper>
            <AmplitudeProvider applicationKey={APPLICATION_KEY}>
                <ApplicationWrapper
                    locale={locale}
                    onChangeLocale={(activeLocale: Locale) => {
                        setLocaleInSessionStorage(activeLocale);
                        setLocale(activeLocale);
                    }}>
                    {appStatusSanityConfig ? (
                        <AppStatusWrapper
                            applicationKey={APPLICATION_KEY}
                            sanityConfig={appStatusSanityConfig}
                            contentRenderer={() => <YtelseSwitch />}
                            unavailableContentRenderer={() => <UnavailablePage />}
                        />
                    ) : (
                        <YtelseSwitch />
                    )}
                </ApplicationWrapper>
            </AmplitudeProvider>
        </SifAppWrapper>
    );
};

const root = document.getElementById('app');
render(<App />, root);
/** build */
