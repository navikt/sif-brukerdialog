import './lovbestemtFerieModal.css';

import { Dialog } from '@navikt/ds-react';
import React from 'react';

interface Props {
    title: string;
    open?: boolean;
    children: React.ReactNode;
    onClose: () => void;
    onClosed?: () => void;
}

const LovbestemtFerieModal = ({ children, title, open = false, onClose, onClosed }: Props) => {
    return (
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
            <Dialog.Popup className="lovbestemtFerieModal" closeOnOutsideClick={false}>
                <Dialog.Header>
                    <Dialog.Title>{title}</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>{open && children}</Dialog.Body>
            </Dialog.Popup>
        </Dialog>
    );
};

export default LovbestemtFerieModal;
