import React from 'react';
import { render } from 'react-dom';
import { Route } from 'react-router-dom';
import { AmplitudeProvider } from '@navikt/sif-common-amplitude/lib';
import { getEnvironmentVariable } from '@navikt/sif-common-core/lib/utils/envUtils';
import SoknadApplication from '@navikt/sif-common-soknad/lib/soknad-application-setup/SoknadApplication';
import SoknadApplicationCommonRoutes from '@navikt/sif-common-soknad/lib/soknad-application-setup/SoknadApplicationCommonRoutes';
import Modal from 'nav-frontend-modal';
import { applicationIntlMessages } from './i18n/applicationMessages';
import IntroPage from './pages/intro-page/IntroPage';
import SoknadRemoteDataFetcher from './soknad/SoknadRemoteDataFetcher';
import '@navikt/sif-common-core/lib/styles/globalStyles.less';
import './styles/app.less';

Modal.setAppElement('#app');

export const APPLICATION_KEY = 'omsorgsdager-midlertidig-alene';
export const SKJEMANAVN = 'Søknad om ekstra omsorgsdager';

const publicPath = getEnvironmentVariable('PUBLIC_PATH');

render(
    <AmplitudeProvider applicationKey={APPLICATION_KEY}>
        <SoknadApplication
            appName="Søknad om å bli regnet som midertidig alene for omsorgen"
            intlMessages={applicationIntlMessages}
            sentryKey={APPLICATION_KEY}
            appStatus={{
                applicationKey: APPLICATION_KEY,
                sanityConfig: {
                    projectId: getEnvironmentVariable('APPSTATUS_PROJECT_ID'),
                    dataset: getEnvironmentVariable('APPSTATUS_DATASET'),
                },
            }}
            publicPath={publicPath}>
            <SoknadApplicationCommonRoutes
                contentRoutes={[
                    <Route path="/" key="intro" exact={true} component={IntroPage} />,
                    <Route path="/soknad" key="soknad" component={SoknadRemoteDataFetcher} />,
                ]}
            />
        </SoknadApplication>
    </AmplitudeProvider>,
    document.getElementById('app')
);
