import { Modal } from '@navikt/ds-react';
import * as React from 'react';
import { IntlProvider } from 'react-intl';
import { BrowserRouter as Router } from 'react-router-dom';

import '@navikt/ds-css';
import '@navikt/sif-common-core-ds/lib/styles/sif-ds-theme.css';

export interface IntlProviderProps {
    children: React.ReactNode;
}

const StoryWrapper = ({ children }: IntlProviderProps) => {
    React.useEffect(() => {
        if (Modal.setAppElement) {
            Modal.setAppElement('#story-wrapper');
        }
        window.document.body.className = window.document.body.className + ' sif-ds-theme';
        (window as any).appSettings = {
            DEKORATOR_URL: 'https://www.nav.no/dekoratoren/?simple=true&chatbot=false',
            LOGIN_URL: 'http://localhost:8089/login',
            API_URL: 'http://localhost:8089',
            PUBLIC_PATH: '/familie/sykdom-i-familien/soknad/opplaringspenger',
            APPSTATUS_PROJECT_ID: 'ryujtq87',
            APPSTATUS_DATASET: 'staging',
            APP_VERSION: 'dev',
        };
    });

    return (
        <Router>
            <IntlProvider messages={{}} locale="nb">
                <div id="story-wrapper" style={{ maxWidth: '600px', fontSize: '1rem' }}>
                    <div style={{ fontSize: '1rem' }}>{children}</div>
                </div>
            </IntlProvider>
        </Router>
    );
};

export default StoryWrapper;
