import './endreArbeidstidModal.css';

import { Dialog } from '@navikt/ds-react';
import React from 'react';

interface Props {
    title: string;
    open: boolean;
    children: React.ReactNode;
    onClose: () => void;
    /** Kalles når lukkeanimasjonen er ferdig, og innholdet kan nullstilles */
    onClosed?: () => void;
}

const EndreArbeidstidModal = ({ children, title, open, onClose, onClosed }: Props) => (
    <Dialog
        open={open}
        onOpenChange={(nextOpen) => {
            if (!nextOpen) {
                onClose();
            }
        }}
        onOpenChangeComplete={(isOpen) => {
            if (!isOpen) {
                onClosed?.();
            }
        }}>
        <Dialog.Popup className="endreArbeidstidModal" closeOnOutsideClick={false}>
            <Dialog.Header>
                <Dialog.Title>{title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>{open && children}</Dialog.Body>
        </Dialog.Popup>
    </Dialog>
);

export default EndreArbeidstidModal;
