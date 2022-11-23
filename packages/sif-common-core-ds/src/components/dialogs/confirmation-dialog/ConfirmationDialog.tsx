import { BodyLong, Button, Heading, Modal, ModalProps } from '@navikt/ds-react';
import React from 'react';
import { useIntl } from 'react-intl';
import intlHelper from '../../../utils/intlUtils';
import ButtonRow from '../../button-row/ButtonRow';
import './confirmationDialog.scss';

export interface Props extends Omit<ModalProps, 'onClose'> {
    title: string;
    onConfirm: () => void;
    onCancel: () => void;
    okLabel?: string;
    cancelLabel?: string;
}

const ConfirmationDialog = (props: Props) => {
    const intl = useIntl();
    const { title, onCancel, onConfirm: onOk, cancelLabel, okLabel, children, ...modalProps } = props;
    return (
        <Modal {...modalProps} closeButton={false} onClose={onCancel}>
            {props.open && (
                <Modal.Content className="confirmationDialog">
                    <div
                        style={{
                            marginTop: 'var(--a-spacing-1)',
                            paddingBottom: 'var(--a-spacing-2)',
                        }}>
                        <Heading size="medium" level="1">
                            {title}
                        </Heading>
                    </div>

                    <BodyLong as="div" className="confirmationDialog__content">
                        {children}
                    </BodyLong>

                    <ButtonRow align="left">
                        <Button variant="primary" onClick={() => onOk()} className="ConfirmationDialog__bekreftKnapp">
                            {okLabel || intlHelper(intl, 'komponent.ConfirmationDialog.bekreftLabel')}
                        </Button>
                        {onCancel && (
                            <Button variant="tertiary" onClick={onCancel} className="ConfirmationDialog__avbrytKnapp">
                                {cancelLabel || intlHelper(intl, 'komponent.ConfirmationDialog.avbrytLabel')}
                            </Button>
                        )}
                    </ButtonRow>
                </Modal.Content>
            )}
        </Modal>
    );
};
export default ConfirmationDialog;
