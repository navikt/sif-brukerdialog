import { Modal } from '@navikt/ds-react';
import React from 'react';

interface Props {
    children: React.ReactNode;
}

const SifAppWrapper: React.FunctionComponent<Props> = ({ children }) => {
    React.useEffect(() => {
        if (Modal.setAppElement) {
            Modal.setAppElement('#app');
        }
        window.document.body.className = window.document.body.className + ' sif-ds-theme';
    });

    return <div className="sif-ds-theme">{children}</div>;
};

export default SifAppWrapper;
