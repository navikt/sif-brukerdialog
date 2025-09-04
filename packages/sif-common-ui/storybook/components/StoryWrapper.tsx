import { BrowserRouter as Router } from 'react-router-dom';
// import '@navikt/ds-css';
import '@navikt/sif-common-core-ds/src/styles/sif-ds-theme.css';
import { useEffect } from 'react';

export interface IntlProviderProps {
    children: React.ReactNode;
}

const StoryWrapper = ({ children }: IntlProviderProps) => {
    useEffect(() => {
        window.document.body.className = window.document.body.className + ' sif-ds-theme';
    });

    return (
        <main>
            <Router>
                <div id="story-wrapper" style={{ fontSize: '1rem' }}>
                    <div style={{ fontSize: '1rem' }}>{children}</div>
                </div>
            </Router>
        </main>
    );
};

export default StoryWrapper;
