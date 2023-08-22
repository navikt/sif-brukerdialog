import { Modal } from '@navikt/ds-react';
import React, { FunctionComponent } from 'react';
import './endreArbeidstidModal.css';
import { createPortal } from 'react-dom';

interface Props {
    title: string;
    isVisible?: boolean;
    children: React.ReactNode;
    onClose: () => void;
}

const EndreArbeidstidModal: FunctionComponent<Props> = ({ children, title, isVisible = false, onClose }) => {
    return createPortal(
        <Modal
            open={isVisible}
            onClose={onClose}
            className="endreArbeidstidModal"
            aria-label="Endre arbeidstid dialog"
            header={{
                heading: title,
            }}>
            <Modal.Body>
                <div style={{ marginTop: 'var(--a-spacing-1)', paddingBottom: 'var(--a-spacing-2)' }}>{children}</div>
            </Modal.Body>
        </Modal>,
        document.body
    );
};

export default EndreArbeidstidModal;
