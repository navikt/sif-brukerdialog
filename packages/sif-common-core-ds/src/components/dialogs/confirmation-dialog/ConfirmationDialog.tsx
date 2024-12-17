import { BodyLong, Button, Modal, ModalProps } from '@navikt/ds-react';
import React from 'react';
import './confirmationDialog.scss';

export interface Props extends Omit<ModalProps, 'onClose'> {
    title: string;
    onConfirm: () => void;
    onCancel: () => void;
    okLabel?: string;
    cancelLabel?: string;
}

const ConfirmationDialog: React.FunctionComponent<Props> = (props: Props) => {
    const { title, onCancel, onConfirm: onOk, cancelLabel, okLabel, children, ...modalProps } = props;
    return props.open ? (
        <Modal
            {...modalProps}
            aria-label={undefined} // Overstyre evt verdi som kommer fra modalProps pga den kan ikke brukes sammen med header
            portal={true}
            onClose={onCancel}
            open={props.open}
            header={{
                closeButton: false,
                heading: title,
            }}>
            <Modal.Body className="confirmationDialog">
                <BodyLong as="div" className="confirmationDialog__content">
                    {children}
                </BodyLong>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => onOk()} className="ConfirmationDialog__bekreftKnapp">
                    {okLabel || 'Ok'}
                </Button>
                {onCancel && (
                    <Button variant="secondary" onClick={onCancel} className="ConfirmationDialog__avbrytKnapp">
                        {cancelLabel || 'Avbryt'}
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
    ) : null;
};
export default ConfirmationDialog;
