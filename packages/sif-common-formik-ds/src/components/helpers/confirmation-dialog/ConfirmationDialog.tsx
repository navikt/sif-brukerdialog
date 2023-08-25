import { BodyLong, Button, Modal, ModalProps } from '@navikt/ds-react';
import { createPortal } from 'react-dom';
import ButtonRow from '../button-row/ButtonRow';
import './confirmationDialog.scss';

export interface Props extends Omit<ModalProps, 'onClose'> {
    title: string;
    onConfirm: () => void;
    onCancel: () => void;
    okLabel?: string;
    cancelLabel?: string;
}

const ConfirmationDialog = (props: Props) => {
    const { title, onCancel, onConfirm: onOk, cancelLabel, okLabel, children, ...modalProps } = props;
    return props.open
        ? createPortal(
              <Modal
                  {...modalProps}
                  onClose={onCancel}
                  open={props.open}
                  header={{
                      closeButton: true,
                      heading: title,
                  }}>
                  <Modal.Body className="confirmationDialog">
                      <BodyLong as="div" className="confirmationDialog__content">
                          {children}
                      </BodyLong>

                      <ButtonRow align="left">
                          <Button variant="primary" onClick={() => onOk()} className="ConfirmationDialog__bekreftKnapp">
                              {okLabel || 'Ok'}
                          </Button>
                          {onCancel && (
                              <Button variant="tertiary" onClick={onCancel} className="ConfirmationDialog__avbrytKnapp">
                                  {cancelLabel || 'Avbryt'}
                              </Button>
                          )}
                      </ButtonRow>
                  </Modal.Body>
              </Modal>,
              document.body
          )
        : null;
};
export default ConfirmationDialog;
