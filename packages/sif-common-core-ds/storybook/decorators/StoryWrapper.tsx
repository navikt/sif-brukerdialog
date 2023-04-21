import { Modal } from '@navikt/ds-react';
import * as React from 'react';
import { IntlProvider } from 'react-intl';
import { allCommonMessages } from '../../src/i18n/allCommonMessages';
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
    });

    return (
        <Router>
            <IntlProvider messages={allCommonMessages.nb} locale="nb">
                <div id="story-wrapper" style={{ maxWidth: '600px', fontSize: '1rem' }}>
                    <div style={{ fontSize: '1rem' }}>{children}</div>
                </div>
            </IntlProvider>
        </Router>
    );
};

export default StoryWrapper;
