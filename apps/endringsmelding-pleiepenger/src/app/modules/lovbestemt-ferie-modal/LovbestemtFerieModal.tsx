import './lovbestemtFerieModal.css';

import { Modal } from '@navikt/ds-react';
import React, { FunctionComponent } from 'react';

interface Props {
    title: string;
    open?: boolean;
    children: React.ReactNode;
    onClose: () => void;
}

const LovbestemtFerieModal: FunctionComponent<Props> = ({ children, title, open = false, onClose }) => {
    return open ? (
        <Modal
            portal={true}
            open={open}
            onClose={onClose}
            className="lovbestemtFerieModal"
            aria-label="Lovbestemt ferie"
            header={{
                heading: title,
                closeButton: true,
            }}>
            <Modal.Body>{children}</Modal.Body>
        </Modal>
    ) : null;
};

export default LovbestemtFerieModal;
