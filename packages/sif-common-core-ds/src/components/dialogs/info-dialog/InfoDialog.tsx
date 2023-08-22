import { BodyLong, Button, Modal, ModalProps } from '@navikt/ds-react';
import React from 'react';
import ButtonRow from '../../../atoms/button-row/ButtonRow';
import '../dialogs.scss';
import './infoDialog.scss';

interface OwnProps {
    children: React.ReactNode;
    okButton?: {
        label: string;
    };
    title: string;
}
type Props = OwnProps & ModalProps;

const InfoDialog = ({ children, okButton, title, ...props }: Props) => (
    <Modal
        className={`infoDialog ${props.className}`}
        {...props}
        header={{
            heading: title,
            label: props['aria-label'],
        }}>
        <Modal.Body className="sif--modal__content" title={props['aria-label']}>
            <BodyLong as="div" className="infoDialog__content">
                {children}
            </BodyLong>

            {okButton && (
                <ButtonRow align="left">
                    <Button variant="primary" onClick={() => props.onClose}>
                        {okButton.label}
                    </Button>
                </ButtonRow>
            )}
        </Modal.Body>
    </Modal>
);

export default InfoDialog;
