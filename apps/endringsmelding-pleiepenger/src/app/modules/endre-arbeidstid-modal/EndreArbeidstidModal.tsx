import './endreArbeidstidModal.css';

import { Modal } from '@navikt/ds-react';
import React, { FunctionComponent } from 'react';

interface Props {
    title: string;
    isVisible?: boolean;
    children: React.ReactNode;
    onClose: () => void;
}

const EndreArbeidstidModal: FunctionComponent<Props> = ({ children, title, isVisible = false, onClose }) => {
    return isVisible ? (
        <Modal
            portal={true}
            open={isVisible}
            onClose={onClose}
            className="endreArbeidstidModal"
            aria-label="Endre arbeidstid dialog"
            header={{
                heading: title,
            }}>
            <Modal.Body>{children}</Modal.Body>
        </Modal>
    ) : null;
};

export default EndreArbeidstidModal;
