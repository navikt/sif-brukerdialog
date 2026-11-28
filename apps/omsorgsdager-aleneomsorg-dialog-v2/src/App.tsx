import '@navikt/ds-css';
import './app.css';

import { ApiErrorType, isApiAxiosError, isApiError } from '@sif/api';
import { appLogger } from '@sif/apm';
import { OmsorgsdagerAleneomsorgApp } from '@sif/app-register';
import { SøknadAppProvider } from '@sif/soknad-app';
import { DemoInfoAlert, InitialDataErrorPage, LoadingPage, NoAccessPage } from '@sif/soknad-ui';
import { useEffect, useRef } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { initApiClients } from './app/api/initApiClients';
import { AppContextProvider } from './app/context/AppContext';
import { applicationIntlMessages, useAppIntl } from './app/i18n';
import { getAppEnv } from './app/setup/appEnv';
import { Søknad } from './app/Soknad';
import { ScenarioHeader } from './demo/ScenarioHeader';
import { useInitialData } from './useInitialData';

const InitialDataError = ({ errors }: { errors: unknown[] }) => {
    const erLogget = useRef(false);
    const { text } = useAppIntl();

    useEffect(() => {
        if (erLogget.current) {
            return;
        }
        erLogget.current = true;

        for (const error of errors) {
            if (!isApiError(error)) {
                appLogger.logError('fetchInitialData: nødvendig data mangler eller uventet klientfeil');
            } else if (error.type === ApiErrorType.ZodValidationError) {
                appLogger.logError('fetchInitialData: responsvalidering feilet');
            } else if (isApiAxiosError(error)) {
                appLogger.logApiError(error.originalError, 'fetchInitialData');
            } else {
                appLogger.logError(`fetchInitialData: innlasting feilet (${error.type})`);
            }
        }
    }, [errors]);

    return <InitialDataErrorPage applicationTitle={text('application.title')} />;
};

const SøknadDataWrapper = () => {
    const result = useInitialData();
    const { text } = useAppIntl();

    switch (result.status) {
        case 'loading':
            return <LoadingPage applicationTitle={text('application.title')} />;
        case 'forbidden':
            return <NoAccessPage applicationTitle={text('application.title')} />;
        case 'error':
            return <InitialDataError errors={result.errors} />;
        case 'success':
            return (
                <AppContextProvider value={result.data}>
                    <Søknad />
                </AppContextProvider>
            );
    }
};

initApiClients();

export const App = () => {
    const env = getAppEnv();

    if (globalThis.location.pathname === '/') {
        globalThis.location.pathname = env.PUBLIC_PATH;
        return null;
    }

    return (
        <SøknadAppProvider
            applicationKey={OmsorgsdagerAleneomsorgApp.key}
            useAnalytics={env.SIF_PUBLIC_USE_ANALYTICS === 'true'}
            appStatusConfig={{
                sanityConfig: {
                    projectId: env.SIF_PUBLIC_APPSTATUS_PROJECT_ID,
                    dataset: env.SIF_PUBLIC_APPSTATUS_DATASET,
                },
            }}
            intlConfig={{
                intlMessages: applicationIntlMessages,
                useLanguageSelector: env.SIF_PUBLIC_FEATURE_NYNORSK === 'on',
            }}>
            <BrowserRouter basename={env.PUBLIC_PATH}>
                {__IS_DEMO__ ? (
                    <>
                        <ScenarioHeader />
                        <DemoInfoAlert appTitle={OmsorgsdagerAleneomsorgApp.tittel.nb} />
                    </>
                ) : null}
                <SøknadDataWrapper />
            </BrowserRouter>
        </SøknadAppProvider>
    );
};
