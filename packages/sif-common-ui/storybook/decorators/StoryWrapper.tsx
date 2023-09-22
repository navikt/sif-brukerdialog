import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import '@navikt/ds-css';
import '@navikt/sif-common-core-ds/lib/styles/sif-ds-theme.css';

export interface IntlProviderProps {
    children: React.ReactNode;
}

const StoryWrapper = ({ children }: IntlProviderProps) => {
    React.useEffect(() => {
        window.document.body.className = window.document.body.className + ' sif-ds-theme';
    });

    return (
        <Router>
            <div id="story-wrapper" style={{ maxWidth: '600px', fontSize: '1rem' }}>
                <div style={{ fontSize: '1rem' }}>{children}</div>
            </div>
        </Router>
    );
};

export default StoryWrapper;
