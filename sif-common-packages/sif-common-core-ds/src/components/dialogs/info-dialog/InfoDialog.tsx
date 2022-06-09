import { Modal, ModalProps } from '@navikt/ds-react';
import ModalContent from '@navikt/ds-react/esm/modal/ModalContent';
import React from 'react';
import '../dialogs.scss';

type Props = { children: React.ReactNode } & ModalProps;

const InfoDialog = ({ children, ...props }: Props) => (
    <Modal className={`infoDialog ${props.className}`} {...props}>
        <ModalContent className="sif--modal__content" title={props['aria-label']}>
            {children}
        </ModalContent>
    </Modal>
);

export default InfoDialog;
