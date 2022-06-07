import { Modal } from '@navikt/ds-react';
import * as React from 'react';
import { render } from 'react-dom';
import { AmplitudeProvider } from '@navikt/sif-common-amplitude';
import AppStatusWrapper from '@navikt/sif-common-core-ds/lib/components/app-status-wrapper/AppStatusWrapper';
import { Locale } from '@navikt/sif-common-core/lib/types/Locale';
import ApplicationWrapper from './components/application-wrapper/ApplicationWrapper';
import UnavailablePage from './components/pages/unavailable-page/UnavailablePage';
import appSentryLogger from './utils/appSentryLogger';
import { getEnvironmentVariable } from './utils/envUtils';
import { getLocaleFromSessionStorage, setLocaleInSessionStorage } from './utils/localeUtils';
import YtelseSwitch from './YtelseSwitch';
import '@navikt/ds-css';
import './app.css';

export const APPLICATION_KEY = 'ettersending';

appSentryLogger.init();

const localeFromSessionStorage = getLocaleFromSessionStorage();

const getAppStatusSanityConfig = () => {
    const projectId = getEnvironmentVariable('APPSTATUS_PROJECT_ID');
    const dataset = getEnvironmentVariable('APPSTATUS_DATASET');
    return !projectId || !dataset ? undefined : { projectId, dataset };
};
// npx tailwindcss -i ./src/app/app.css -o ./dist/output.css --watch

const App = () => {
    const [locale, setLocale] = React.useState<Locale>(localeFromSessionStorage);
    const appStatusSanityConfig = getAppStatusSanityConfig();

    React.useEffect(() => {
        if (Modal.setAppElement) {
            Modal.setAppElement('#app');
        }
    });
    return (
        <div className="sif-ds-theme">
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
        </div>
    );
};

const root = document.getElementById('app');
render(<App />, root);
