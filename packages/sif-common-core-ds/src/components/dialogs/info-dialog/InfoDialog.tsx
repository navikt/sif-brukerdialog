import { BodyLong, Button, Heading, Modal, ModalProps } from '@navikt/ds-react';
import ModalContent from '@navikt/ds-react/esm/modal/ModalContent';
import React from 'react';
import ButtonRow from '../../../atoms/button-row/ButtonRow';
import '../dialogs.scss';
import './infoDialog.scss';

interface OwnProps {
    children: React.ReactNode;
    okButton?: {
        label: string;
    };
    title?: string;
}
type Props = OwnProps & ModalProps;

const InfoDialog = ({ children, okButton, title, ...props }: Props) => (
    <Modal className={`infoDialog ${props.className}`} {...props}>
        <ModalContent className="sif--modal__content" title={props['aria-label']}>
            {title && (
                <div
                    style={{
                        marginTop: 'var(--a-spacing-1)',
                        paddingBottom: 'var(--a-spacing-2)',
                    }}>
                    <Heading size="medium" level="1">
                        {title}
                    </Heading>
                </div>
            )}

            <BodyLong as="div" className="infoDialog__content">
                {children}
            </BodyLong>

            {okButton && (
                <ButtonRow align="left">
                    <Button variant="primary" onClick={props.onClose}>
                        {okButton.label}
                    </Button>
                </ButtonRow>
            )}
        </ModalContent>
    </Modal>
);

export default InfoDialog;
