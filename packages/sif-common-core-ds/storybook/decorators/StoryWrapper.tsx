import { Modal } from '@navikt/ds-react';
import * as React from 'react';
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
        <div id="story-wrapper" style={{ maxWidth: '600px', fontSize: '1rem' }}>
            <div style={{ fontSize: '1rem' }}>{children}</div>
        </div>
    );
};

export default StoryWrapper;
