import * as React from 'react';
import { IntlProvider } from 'react-intl';
import { BrowserRouter as Router } from 'react-router-dom';
import '@navikt/ds-css';
import '@navikt/sif-common-core-ds/src/styles/sif-ds-theme.css';

export interface IntlProviderProps {
    children: React.ReactNode;
    messages?: Record<string, string>;
}

const StoryWrapper = ({ children, messages }: IntlProviderProps) => {
    React.useEffect(() => {
        window.document.body.className = window.document.body.className + ' sif-ds-theme';
    });

    return (
        <Router>
            <IntlProvider messages={messages} locale="nb">
                <div id="story-wrapper" style={{ maxWidth: '600px', fontSize: '1rem' }}>
                    <div style={{ fontSize: '1rem' }}>{children}</div>
                </div>
            </IntlProvider>
        </Router>
    );
};

export default StoryWrapper;
